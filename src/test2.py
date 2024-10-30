import matplotlib.pyplot as plt
import numpy as np

# Data
metrics = ['Model Size (GB)', 'Inference Time (ms)', 'Memory Usage (GB)']
original = [13.2, 245, 16.8]
quantized = [3.3, 98, 4.2]

# Create figure
plt.figure(figsize=(10, 6))

# Bar positions
x = np.arange(len(metrics))
width = 0.35

# Create bars
plt.bar(x - width/2, original, width, label='Original Model', color='#2E86C1')
plt.bar(x + width/2, quantized, width, label='Quantized Model', color='#28B463')

# Customize plot
plt.xlabel('Metrics')
plt.ylabel('Values')
plt.title('Model Quantization Results')
plt.xticks(x, metrics)
plt.legend()
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Add value labels
for i, v in enumerate(original):
    plt.text(i - width/2, v, str(v), ha='center', va='bottom')
for i, v in enumerate(quantized):
    plt.text(i + width/2, v, str(v), ha='center', va='bottom')

plt.tight_layout()
plt.savefig('quant.png', dpi=300, bbox_inches='tight')
plt.close()