# ETT (Electricity Transformer Temperature) Dataset Overview

## Introduction

The ETT (Electricity Transformer Temperature) dataset is a benchmark dataset widely used for time series forecasting research. It was collected from electricity transformers in China over a period of two years (July 2016 to July 2018).

## Dataset Description

The ETT dataset contains measurements from electricity transformers, including:

- **OT (Oil Temperature)**: The target variable representing the oil temperature of the transformer.
- **HUFL**: High useful load (high voltage side useful current load)
- **HULL**: High useless load (high voltage side useless current load)
- **MUFL**: Middle useful load (middle voltage side useful current load)
- **MULL**: Middle useless load (middle voltage side useless current load)
- **LUFL**: Low useful load (low voltage side useful current load)
- **LULL**: Low useless load (low voltage side useless current load)

## Dataset Variants

There are four ETT dataset variants:

1. **ETTh1**: Hourly data from station 1
2. **ETTh2**: Hourly data from station 2
3. **ETTm1**: 15-minute interval data from station 1
4. **ETTm2**: 15-minute interval data from station 2

Each dataset contains approximately 17,420 data points for hourly variants and 69,680 for 15-minute variants.

## Use Cases

The ETT dataset is commonly used for:

- Long-term time series forecasting
- Benchmarking transformer-based models (e.g., Informer, Autoformer, FEDformer, PatchTST)
- Multivariate time series prediction

## Forecasting Horizons

Typical prediction horizons used in research:

- Short-term: 24, 48 steps
- Long-term: 96, 192, 336, 720 steps

## Publication

The ETT dataset was introduced in the paper:
**"Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting"**
by Haoyi Zhou et al., published at AAAI 2021.
