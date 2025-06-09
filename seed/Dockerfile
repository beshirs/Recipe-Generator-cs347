FROM python:3.10-slim

WORKDIR /app
COPY import_csv.py .
COPY recipe_data.csv ./recipe_data.csv

RUN pip install pandas pymongo

CMD ["python", "import_csv.py"]
