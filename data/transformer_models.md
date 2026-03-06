# Transformer Models for Time Series Forecasting

## Introduction

Transformer architecture, originally designed for NLP tasks, has been widely adopted for time series forecasting. Its self-attention mechanism is well-suited to capture long-range dependencies in sequential data.

## Key Transformer-Based Models

### Informer (2021)
- Introduced ProbSparse self-attention to reduce O(L²) complexity
- Designed specifically for long-sequence time series forecasting
- Uses distilling operation to reduce sequence length
- Introduced the ETT dataset as benchmark
- Achieved SOTA on ETT datasets at time of publication

### Autoformer (2021)
- Introduces Auto-Correlation mechanism based on Fast Fourier Transform
- Replaces traditional attention with series-wise connection
- Incorporates decomposition architecture (trend + seasonality)
- Strong performance on long-term forecasting

### FEDformer (2022)
- Frequency Enhanced Decomposed Transformer
- Applies attention in frequency domain using Fourier transform
- Combines Transformer with classical seasonal-trend decomposition
- Achieves linear complexity O(L)

### PatchTST (2023)
- Segments time series into patches (subseries-level tokens)
- Channel-independent approach — each variate processed independently
- Uses vanilla Transformer with positional encoding
- State-of-the-art on many benchmarks including ETT datasets

### iTransformer (2024)
- Inverted Transformer — treats each variate as a token (not time steps)
- Applies self-attention across variates for multivariate correlations
- Feed-forward network captures temporal dynamics
- Achieves strong results on high-dimensional multivariate data

## Self-Attention Mechanism

The core of Transformer models:

```
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
```

Where:
- Q = Query matrix
- K = Key matrix  
- V = Value matrix
- d_k = dimension of keys

## Comparison on ETT Datasets

| Model | ETTh1 MSE | ETTh2 MSE | ETTm1 MSE | ETTm2 MSE |
|-------|-----------|-----------|-----------|-----------|
| Informer | 0.865 | 3.755 | 0.773 | 0.607 |
| Autoformer | 0.449 | 0.439 | 0.372 | 0.187 |
| FEDformer | 0.376 | 0.346 | 0.315 | 0.173 |
| PatchTST | 0.370 | 0.274 | 0.272 | 0.157 |
| iTransformer | 0.386 | 0.297 | 0.334 | 0.180 |

(Prediction horizon = 96 steps)

## Key Concepts

### Positional Encoding
Transformers require positional encoding since they have no inherent notion of order:
- Sinusoidal encoding (original)
- Learnable positional embeddings
- Timestamp-aware encoding for time series

### Patch Embedding
Converting raw time series into patch tokens:
- Reduces sequence length, lowering computational cost
- Creates local semantic meaning for each token
- Similar to ViT's approach for images
