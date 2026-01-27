import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as fs from 'fs/promises';
import type { EvaluationResult, RunnerOptions } from '../index.js';

export interface VisualRunnerOptions extends RunnerOptions {
  referenceImage: string;
  capturedImage: string;
  threshold?: number; // Default 0.1 (10% tolerance)
  breakpoints?: number[]; // Viewport widths to test
}

export class VisualRunner {
  async run(options: VisualRunnerOptions): Promise<EvaluationResult> {
    try {
      const [refBuffer, capBuffer] = await Promise.all([
        fs.readFile(options.referenceImage),
        fs.readFile(options.capturedImage)
      ]);

      const refPng = PNG.sync.read(refBuffer);
      const capPng = PNG.sync.read(capBuffer);

      // Resize if dimensions don't match
      if (refPng.width !== capPng.width || refPng.height !== capPng.height) {
        return {
          score: 0,
          maxScore: 100,
          details: {
            error: 'Image dimensions do not match',
            reference: { width: refPng.width, height: refPng.height },
            captured: { width: capPng.width, height: capPng.height }
          }
        };
      }

      const { width, height } = refPng;
      const diff = new PNG({ width, height });

      const mismatchedPixels = pixelmatch(
        refPng.data,
        capPng.data,
        diff.data,
        width,
        height,
        { threshold: options.threshold || 0.1 }
      );

      const totalPixels = width * height;
      const matchPercentage = ((totalPixels - mismatchedPixels) / totalPixels) * 100;

      // Save diff image for debugging
      const diffPath = options.capturedImage.replace(/\.[^.]+$/, '.diff.png');
      await fs.writeFile(diffPath, PNG.sync.write(diff));

      return {
        score: Math.round(matchPercentage * 10) / 10,
        maxScore: 100,
        details: {
          mismatchedPixels,
          totalPixels,
          matchPercentage,
          diffImage: diffPath
        }
      };
    } catch (error) {
      return {
        score: 0,
        maxScore: 100,
        details: { error: String(error) }
      };
    }
  }

  async runResponsive(options: VisualRunnerOptions): Promise<EvaluationResult> {
    const breakpoints = options.breakpoints || [375, 768, 1440];
    const results: Array<{ breakpoint: number; score: number }> = [];

    for (const bp of breakpoints) {
      const refImage = options.referenceImage.replace(/\.[^.]+$/, `-${bp}$&`);
      const capImage = options.capturedImage.replace(/\.[^.]+$/, `-${bp}$&`);

      try {
        await fs.access(refImage);
        await fs.access(capImage);

        const result = await this.run({
          ...options,
          referenceImage: refImage,
          capturedImage: capImage
        });

        results.push({ breakpoint: bp, score: result.score });
      } catch {
        // Skip missing breakpoint images
        results.push({ breakpoint: bp, score: 0 });
      }
    }

    const avgScore = results.reduce((a, r) => a + r.score, 0) / results.length;

    return {
      score: Math.round(avgScore * 10) / 10,
      maxScore: 100,
      details: { breakpoints: results }
    };
  }
}
