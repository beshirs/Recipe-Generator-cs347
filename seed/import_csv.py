import pandas as pd
from pymongo import MongoClient
import time

time.sleep(5)

client = MongoClient("mongodb://mongo:27017")
db = client['recipeDB']
collection = db['recipes']

df = pd.read_csv("recipe_data.csv")
data = df.to_dict(orient='records')
collection.insert_many(data)
print(f"Inserted {len(data)} recipes into MongoDB.")
