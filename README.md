Website: https://ml-app-oykczflk5a-uc.a.run.app/ (Please be patient may take some time to load.)
Data Link: https://www.dropbox.com/scl/fo/92ntgb4vdsfartckqtav8/ACh25SZRk7pFYexn9Zh7w0U?rlkey=nfvqoonba0cdjwq361mrrjlf6&e=1&st=gru0s7b3&dl=0

# Moonboard Climbing Grade Prediction and Generation

## Overview

In this project, we implement a custom transformer model to predict climbing grades on the **Moonboard**, an 18x11 grid composed of fixed holds used by rock climbers for training. We designed a graph-based approach where **active holds are represented as nodes**, and edges between them are defined by a distance metric representing a climber's maximum reach (wingspan). This structure forms the basis for our **hold embeddings**, which we call **"hold2vec"**—a method analogous to Word2Vec, where each hold (node) is predicted based on its neighboring holds (context).

### Steps

1. **Graph Structure & Embedding ("hold2vec")**:
   - We represent each hold as a node, and edges connect holds that are within a reachable distance for a climber.
   - Using the context of connected holds, we predict each hold (node), generating a vector embedding for each Moonboard hold.
   - When visualized in 3D space, these embeddings closely resemble the physical Moonboard layout.

2. **Custom Transformer**:
   - After generating the embeddings using "hold2vec", we expand their dimensionality using a fully connected neural network.
   - The expanded embeddings are then passed through a **custom transformer model** built using **PyTorch**.
   - Our model outperforms traditional machine learning models (e.g., fully connected networks, GNNs, and RNNs).

3. **Climb Classification Website**:
   - We developed a **website** using **Docker**, **Flask**, and **Google Cloud Platform (GCP)** for model hosting, with a front-end built in **React**.
   - Users can input a sequence of holds on the Moonboard, and our model will classify it into a **climbing grade**.

4. **Climb Generation**:
   - We also developed an algorithm for **climb generation** based on a specific grade using a **Markov Chain with Monte Carlo sampling**.
   - Given a grade, the algorithm generates a sequence of holds to form a complete climb. The climb is validated by our classification model to ensure the correct grade.
   - The climb generation feature is also available on our website under the **"Climb Generation"** section.

## Notebooks

- **[transformer.ipynb](./transformer.ipynb)**: Detailed implementation of the custom transformer architecture.
- **[hold2vec.ipynb](./hold2vec.ipynb)**: Explanation of the embedding technique used to represent Moonboard holds.
- **[climbgen+eda.ipynb](./climbgen+eda.ipynb)**: Logic behind the graph structure and the climb generation algorithm.

## Web Files

- Visit the `webfiles` folder to see how the website was built using **Docker**, **Flask**, **GCP**, and **React**.

---

This project showcases a unique application of machine learning to the sport of rock climbing, combining neural networks, transformers, and graph-based models to predict and generate climbing routes on the Moonboard.
