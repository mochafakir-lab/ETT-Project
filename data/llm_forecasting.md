# Large Language Models for Time Series Forecasting

## Overview

Large Language Models (LLMs) have recently been applied to time series forecasting tasks, leveraging their powerful pattern recognition and contextual understanding capabilities.

## Key Approaches

### 1. Prompt-based Forecasting
LLMs can be used directly with carefully crafted prompts that represent time series data as text sequences. The model is asked to predict future values based on historical context.

### 2. Fine-tuning on Time Series Data
Pre-trained LLMs can be fine-tuned on time series datasets to specialize in forecasting tasks. This approach adapts the general language understanding to numerical patterns.

### 3. Hybrid Models
Combining traditional time series models with LLMs:
- Using LLMs for feature extraction
- Using LLMs to generate textual descriptions of patterns
- Feeding LLM outputs into traditional forecasters

## Notable Models

### GPT4TS
Repurposes GPT-2 for time series forecasting by:
- Treating time series patches as tokens
- Freezing most parameters and fine-tuning only layer norms and positional embeddings
- Achieving strong results across multiple benchmarks

### Time-LLM
- Reprograms time series data into text space
- Uses a pre-trained LLM backbone with minimal modifications
- Demonstrates strong zero-shot and few-shot capabilities

### TEMPO
- Uses GPT-2 architecture adapted for time series
- Introduces trend-seasonality decomposition
- Handles multiple forecasting horizons simultaneously

## Challenges

1. **Tokenization**: Converting continuous numerical data to tokens LLMs understand
2. **Computational Cost**: LLMs are computationally expensive compared to specialized models
3. **Distribution Shifts**: LLMs trained on text may struggle with numerical extrapolation
4. **Interpretability**: LLM forecasts are harder to interpret than traditional models

## Benchmarking on ETT Dataset

LLMs applied to ETT datasets typically show:
- Competitive performance on long-horizon forecasting (336, 720 steps)
- Strong zero-shot generalization capabilities
- Better performance when domain knowledge is incorporated in prompts

## Evaluation Metrics

Common metrics used when evaluating on ETT and similar datasets:
- **MSE (Mean Squared Error)**: Measures average squared differences
- **MAE (Mean Absolute Error)**: Measures average absolute differences
- **MAPE**: Mean Absolute Percentage Error
