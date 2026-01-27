/**
 * Task Variation System
 *
 * Generates dynamic parameters for each benchmark run to ensure
 * test diversity and prevent overfitting to specific patterns.
 */

export interface TaskVariation {
  seed: number;
  entityNames: EntityNames;
  apiEndpoints: ApiEndpoints;
  dataSchemas: DataSchemas;
  businessRules: BusinessRules;
}

export interface EntityNames {
  user: string;
  product: string;
  order: string;
  payment: string;
  settings: string;
}

export interface ApiEndpoints {
  prefix: string;
  version: string;
}

export interface DataSchemas {
  idType: 'uuid' | 'nanoid' | 'cuid' | 'incremental';
  timestampFormat: 'iso' | 'unix' | 'epoch_ms';
  currencyFormat: 'cents' | 'decimal';
}

export interface BusinessRules {
  maxItemsPerPage: number;
  sessionTimeout: number;
  passwordMinLength: number;
  otpExpiry: number;
}

// Name pools for entity variation
const USER_NAMES = ['User', 'Member', 'Account', 'Profile', 'Customer'];
const PRODUCT_NAMES = ['Product', 'Item', 'Listing', 'Article', 'Goods'];
const ORDER_NAMES = ['Order', 'Purchase', 'Transaction', 'Booking', 'Request'];
const PAYMENT_NAMES = ['Payment', 'Charge', 'Invoice', 'Bill', 'Receipt'];
const SETTINGS_NAMES = ['Settings', 'Preferences', 'Config', 'Options', 'Profile'];

const API_PREFIXES = ['api', 'v1', 'rest', 'service', 'backend'];
const API_VERSIONS = ['v1', 'v2', 'v3', '2024-01', '2025-01'];

/**
 * Seeded random number generator for reproducibility
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  pick<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)];
  }

  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

/**
 * Generate a task variation based on a seed
 */
export function generateVariation(seed?: number): TaskVariation {
  const actualSeed = seed ?? Date.now();
  const rng = new SeededRandom(actualSeed);

  return {
    seed: actualSeed,
    entityNames: {
      user: rng.pick(USER_NAMES),
      product: rng.pick(PRODUCT_NAMES),
      order: rng.pick(ORDER_NAMES),
      payment: rng.pick(PAYMENT_NAMES),
      settings: rng.pick(SETTINGS_NAMES),
    },
    apiEndpoints: {
      prefix: rng.pick(API_PREFIXES),
      version: rng.pick(API_VERSIONS),
    },
    dataSchemas: {
      idType: rng.pick(['uuid', 'nanoid', 'cuid', 'incremental'] as const),
      timestampFormat: rng.pick(['iso', 'unix', 'epoch_ms'] as const),
      currencyFormat: rng.pick(['cents', 'decimal'] as const),
    },
    businessRules: {
      maxItemsPerPage: rng.pick([10, 20, 25, 50, 100]),
      sessionTimeout: rng.pick([900, 1800, 3600, 7200]), // seconds
      passwordMinLength: rng.pick([8, 10, 12, 14]),
      otpExpiry: rng.pick([60, 120, 180, 300]), // seconds
    },
  };
}

/**
 * Apply variation to a task prompt
 */
export function applyVariation(prompt: string, variation: TaskVariation): string {
  let result = prompt;

  // Replace entity names
  result = result.replace(/\bUser\b/g, variation.entityNames.user);
  result = result.replace(/\bProduct\b/g, variation.entityNames.product);
  result = result.replace(/\bOrder\b/g, variation.entityNames.order);
  result = result.replace(/\bPayment\b/g, variation.entityNames.payment);
  result = result.replace(/\bSettings\b/g, variation.entityNames.settings);

  // Replace API endpoints
  result = result.replace(/\/api\//g, `/${variation.apiEndpoints.prefix}/`);

  // Add variation context header
  const variationHeader = `
<!-- Task Variation (Seed: ${variation.seed}) -->
<!-- Entity Naming: ${variation.entityNames.user}, ${variation.entityNames.product} -->
<!-- API: /${variation.apiEndpoints.prefix}/${variation.apiEndpoints.version} -->
<!-- ID Type: ${variation.dataSchemas.idType} -->
<!-- Pagination: ${variation.businessRules.maxItemsPerPage} items/page -->

`;

  return variationHeader + result;
}

/**
 * Generate variation metadata for result tracking
 */
export function variationMetadata(variation: TaskVariation): Record<string, string | number> {
  return {
    seed: variation.seed,
    userEntity: variation.entityNames.user,
    productEntity: variation.entityNames.product,
    apiPrefix: variation.apiEndpoints.prefix,
    idType: variation.dataSchemas.idType,
    pageSize: variation.businessRules.maxItemsPerPage,
  };
}

export default { generateVariation, applyVariation, variationMetadata };
