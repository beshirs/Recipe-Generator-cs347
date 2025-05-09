import pandas as pd

# Load the raw CSV file
df = pd.read_csv("recipes.csv")
print(df.columns)

# Cleaned ingredients
df['Ingredients'] = df['Cleaned_Ingredients']

# Remove excess
columns_to_drop = ['Unnamed: 0', 'Image_Name', 'Cleaned_Ingredients']
df = df.drop(columns=[col for col in columns_to_drop if col in df.columns])

# Name change
df = df.rename(columns={'Title': 'Name'})
df = df[['Name', 'Ingredients', 'Instructions']]

# Polished formatting
df['Name'] = df['Name'].str.strip()
df['Ingredients'] = df['Ingredients'].str.strip().str.lower()
df['Instructions'] = df['Instructions'].str.strip()

# Cleaned data
df.to_csv("clean_data.csv", index=False)
print("Data clean")


