import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# Generate sample training data
steps = np.arange(0, 1000, 10)
training_loss = 4 * np.exp(-steps/200) + 0.2 * np.random.random(len(steps))
val_loss = training_loss + 0.5 * np.random.random(len(steps))
accuracy = 0.4 + 0.5 * (1 - np.exp(-steps/150)) + 0.05 * np.random.random(len(steps))
perplexity = 50 * np.exp(-steps/250) + 5 + 2 * np.random.random(len(steps))

# Set style
# plt.style.use('seaborn')
sns.set_palette("husl")

# Create subplots
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 12))

# Training/Validation Loss
ax1.plot(steps, training_loss, label='Training Loss')
ax1.plot(steps, val_loss, label='Validation Loss')
ax1.set_title('Training and Validation Loss')
ax1.set_xlabel('Steps')
ax1.set_ylabel('Loss')
ax1.legend()
ax1.grid(True)

# Accuracy
ax2.plot(steps, accuracy, color='green')
ax2.set_title('Model Accuracy')
ax2.set_xlabel('Steps')
ax2.set_ylabel('Accuracy')
ax2.grid(True)

# Perplexity
ax3.plot(steps, perplexity, color='red')
ax3.set_title('Model Perplexity')
ax3.set_xlabel('Steps')
ax3.set_ylabel('Perplexity')
ax3.grid(True)

# Model Size Comparison (Pre/Post Quantization)
sizes = ['Original', 'Quantized']
model_sizes = [13.2, 3.3]  # GB
ax4.bar(sizes, model_sizes, color=['blue', 'orange'])
ax4.set_title('Model Size Comparison')
ax4.set_ylabel('Size (GB)')
for i, v in enumerate(model_sizes):
    ax4.text(i, v + 0.1, f'{v}GB', ha='center')

plt.tight_layout()
plt.savefig('training_metrics.png', dpi=300, bbox_inches='tight')
plt.close()

# Create confusion matrix
# classes = ['健康', '病蟲害', '營養不良', '水分不足']
# classes = ['Healthy', 'Pests', 'Nutrient Deficiency', 'Water Deficiency']
classes = ['H', 'P', 'ND', 'WD']
confusion_matrix = np.array([
    [95, 2, 2, 1],
    [3, 92, 3, 2],
    [2, 3, 90, 5],
    [1, 2, 4, 93]
])

plt.figure(figsize=(8, 6))
sns.heatmap(confusion_matrix, annot=True, fmt='d', cmap='Blues',
            xticklabels=classes, yticklabels=classes)
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.savefig('confusion_matrix.png', dpi=300, bbox_inches='tight')
plt.close()