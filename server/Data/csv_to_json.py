import pandas as pd
import json

# Read the CSV file
df = pd.read_csv("recipes.csv")

# Convert to JSON
json_data = df.to_json(orient='records', indent=2)

# Write to JSON file
with open("recipes.json", "w") as f:
    f.write(json_data)

print("CSV successfully converted to JSON!") 