# Task: Text Classification Fine-Tuning

## Objective
Build a pipeline to fine-tune a language model for multi-class text classification.

## Requirements

1. **Data Preparation**
   - Load training data (CSV/JSON)
   - Train/validation split
   - Text preprocessing
   - Label encoding

2. **Fine-Tuning**
   - Use base model (BERT, DistilBERT)
   - Add classification head
   - Configure training params
   - Track metrics (accuracy, F1)

3. **Training Pipeline**
   - Data loaders with batching
   - Learning rate scheduling
   - Early stopping
   - Checkpointing

4. **API**
   - `POST /train` - Start training
   - `GET /train/{id}/status` - Training status
   - `POST /predict` - Run inference
   - `GET /models` - List trained models

## Technical Stack
- Python 3.11+
- FastAPI
- Hugging Face Transformers
- PyTorch

## Files to Create
- `training/data.py` - Data loading
- `training/model.py` - Model setup
- `training/trainer.py` - Training loop
- `inference/predictor.py` - Inference
- `app/routers/train.py` - API endpoints

## Success Criteria
- [ ] Model fine-tunes successfully
- [ ] Validation metrics tracked
- [ ] Checkpoints saved
- [ ] Inference works correctly
- [ ] Multiple labels supported
