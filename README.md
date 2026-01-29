<h1 align="center">KUROKO</h1>

<p align="center">
Fine-Grained Severity Ranking for Scalable Content Moderation
</p>

---

## 📌 Background

With entertainment and learning activities increasingly taking place on video platforms, **content moderation** has become critical — especially for protecting minors. Effective moderation requires not only maintaining platform health but also **tiered enforcement**, where content is handled according to risk severity rather than through rigid, one-size-fits-all rules. Overly coarse enforcement can harm user experience and even suppress high-quality content.

Although Vision–Language Models (VLMs) have advanced multimodal understanding, real-world moderation systems still rely heavily on **classification-style pipelines** to meet high-throughput demands. These systems produce **coarse labels** and lack the **fine-grained severity estimation** necessary for tiered moderation.

---

## 🚧 Key Challenges

Deploying VLM-based moderation in real platforms faces three major bottlenecks:

1. **Data Scalability** – Lack of scalable methods to construct high-quality moderation datasets  
2. **Severity Awareness** – Predictions are rule-matching based, without severity ranking  
3. **Efficiency Trade-off** – Balancing accuracy with high-throughput, low-latency inference  

---

## 💡 Our Solution: **KUROKO**

KUROKO introduces **violation severity ranking** to directly power tiered moderation.

### 🔹 1. Scalable Data Pipeline
We design a **hybrid human-in-the-loop annotation pipeline** that produces high-fidelity, fine-grained moderation labels at scale.  
This enables the creation of the:

> **Fine-Grained Content Moderation Benchmark (FG-CMB)**

### 🔹 2. Severity-Aware Learning Framework
KUROKO unifies rule understanding with learning-to-rank optimization through a **two-stage training strategy**:

- **Stage 1:** Multi-task Supervised Fine-Tuning (SFT)  
- **Stage 2:** Reinforcement Learning (RL)

The RL phase introduces a novel reward:

> **Severity-Aware Constrained Rule-Matching (SACRM)**  
which aligns rule-grounded predictions with calibrated severity scores.

### 🔹 3. Efficient Inference Architecture
We propose a **coarse-to-fine inference pipeline** with **adaptive Chain-of-Thought reasoning**, enabling real-world deployment with both high efficiency and high precision.

---

## 📦 Dataset Availability

**FG-ModBench** will be publicly released upon paper acceptance.

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/45d3ed76-efdb-43a9-9155-b842bc86c89c" width="700"/>
  <br>
  <em>Figure X. Fine-Grained Content Moderation Benchmark (FG-CMB).</em>
</p>
