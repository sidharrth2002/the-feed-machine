# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

from fastapi import FastAPI
from starlette.responses import RedirectResponse
from .models import ClassifyRequest
from transformers import pipeline

zero_shot_classifier = pipeline("zero-shot-classification")

print(zero_shot_classifier)


app = FastAPI(
    title="zero_shot",
    version="1.0",
    description="Host Zero Shot Classification for Feed Machine",
)


@app.post("/classify")
def classify(request: ClassifyRequest):
    result = zero_shot_classifier(request.text, request.labels)
    print(result)
    if len(result['labels']) == 0:
        return "news"
    else:
        return result['labels'][0]


@app.get("/", include_in_schema=False)
def docs_redirect():
    return RedirectResponse(f"/docs")
