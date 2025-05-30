import pandas as pd
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import os

# Connect to MongoDB
uri = "mongodb+srv://taha:Myballs12@cluster347.uraihne.mongodb.net/recipeDB?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['recipeDB']
collection = db['recipes']

# Load CSV
csv_path = os.path.join("server", "data", "recipe_data.csv")
df = pd.read_csv(csv_path)

# Convert and insert
data = df.to_dict(orient='records')
collection.insert_many(data)
print(f"Inserted {len(data)} recipes into MongoDB.")
