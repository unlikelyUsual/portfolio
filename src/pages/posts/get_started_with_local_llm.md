---
title: "Run LLM Models Locally for FREE"
layout: ../../layouts/post.astro
pubDate: 2024-09-10
description: "Learn how to use Ollama to run Large Language Models (LLMs) locally on your machine for free."
author: "Prabhat"
excerpt: This blog post will be introduction to how to use local LLMs within 10 minutes
image:
  src:
  alt:
tags: ["AI", "LLM", "Ollama", "Local Development"]
---

# Run LLM Models Locally for FREE

This blog post will be introduction to how to use local LLMs within 10 minutes introducing Ollama, a free, open-source tool for managing and running Large Language Models (LLMs) locally.

## What is Ollama?

Ollama is a free, open-source tool that allows you to run Large Language Models (LLMs) locally, eliminating the need for paid services like ChatGPT. This provides privacy, security, and cost-free access to these models.

## Installation and Setup

To get started with Ollama, you need to download the tool from the official website [ollama.com](https://ollama.com) and install it for your operating system (Windows, Linux, or Mac).

Once installed, you can run Ollama through the desktop application or via the command prompt/terminal:

```bash
ollama
```

A successful installation will yield an output in the terminal.

## Model Selection and Usage

Ollama provides access to a wide array of open-source models, including custom configurations and models from platforms like Hugging Face. Note the storage and RAM requirements for these models, as some can be quite large.

To find and download models from the Ollama library, use the following command:

```bash
ollama run [model identifier]
```

For example, to run the Llama 2 model:

```bash
ollama run llama2
```

You can switch between models using the same command. To list installed models, use:

```bash
ollama list
```

## Integration with Code

Ollama exposes an HTTP API on Local Host, enabling integration with various applications through HTTP requests.

Here's an example of sending requests using Python:

```python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'llama2',
    'prompt': 'Why is the sky blue?'
})

print(response.json()['response'])
```

For easier integration, the "ollama" Python module is available.

## Model Customization

Ollama allows for customization of models using model files. You can define parameters like temperature and system messages to tailor the model's behavior.

Here's an example of creating a custom model named "Mario" based on Llama 3.2:

```
FROM llama3.2

SYSTEM You are Mario from Super Mario Bros.

TEMPLATE """{{ .Prompt }}"""
```

These custom models can also be used from code.

## Conclusion

Ollama provides a versatile and accessible way to run LLMs locally, offering flexibility and control over model usage and customization.
