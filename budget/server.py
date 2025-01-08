# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # This will allow all domains by default

# # Load the Random Forest model
# rf_model = joblib.load('rf_model.pkl')

# # Feature extraction function (same as in your model training)
# def extract_features(url):
#     features = {}
#     features['url_length'] = len(url)
#     features['num_digits'] = sum(c.isdigit() for c in url)
#     special_chars = ['-', '@', '.', '%', '/']
#     features['num_special_chars'] = sum(url.count(c) for c in special_chars)
#     features['https'] = int('https' in url)
#     keywords = ['login', 'secure', 'account', 'bank', 'signin','subscribe']
#     features['suspicious_keyword'] = int(any(keyword in url for keyword in keywords))
#     return pd.DataFrame([features])

# # API endpoint for URL classification
# @app.route('/classify_url', methods=['POST'])
# def classify_url():
#     data = request.get_json()  # Get data from the POST request
#     url = data['url']  # Extract URL from the request
    
#     # Extract features from the URL
#     features = extract_features(url)
    
#     # Predict using the Random Forest model
#     prediction = rf_model.predict(features)[0]
    
#     # Return the result
#     result = "Unsafe" if prediction == 1 else "Safe"
#     return jsonify({'result': result})

# if __name__ == '__main__':
#     app.run(debug=True)

# # pip install Flask scikit-learn pandas
# # npm install axios
# # pip install flask-cors
# # npm install i react-push-notifications --force

# # python server.py 


from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)
CORS(app)  # This will allow all domains by default

# Load the Random Forest model for URL classification
rf_model = joblib.load('rf_model.pkl')

# Load the models and DataFrame for budget classification
budget_data = joblib.load('budget_outlier_detection.pkl')
budget_models = budget_data['models']
budget_df = budget_data['df']

# URL Classification Feature extraction function (same as in your model training)
def extract_features(url):
    features = {}
    features['url_length'] = len(url)
    features['num_digits'] = sum(c.isdigit() for c in url)
    special_chars = ['-', '@', '.', '%', '/']
    features['num_special_chars'] = sum(url.count(c) for c in special_chars)
    features['https'] = int('https' in url)
    keywords = ['login', 'secure', 'account', 'bank', 'signin', 'subscribe']
    features['suspicious_keyword'] = int(any(keyword in url for keyword in keywords))
    return pd.DataFrame([features])

# API endpoint for URL classification
@app.route('/classify_url', methods=['POST'])
def classify_url():
    data = request.get_json()  # Get data from the POST request
    url = data['url']  # Extract URL from the request
    
    # Extract features from the URL
    features = extract_features(url)
    
    # Predict using the Random Forest model
    prediction = rf_model.predict(features)[0]
    
    # Return the result
    result = "Unsafe" if prediction == 1 else "Safe"
    return jsonify({'result': result})

# Budget classification helper functions
def categorize_input(user_input, df):
    user_input = user_input.lower()

    # Collect all categories and their combined descriptions
    categories = df[['Category', 'Combined']]

    # Create a TF-IDF vectorizer to convert text to numerical data
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(categories['Combined'].tolist() + [user_input])

    # Compute cosine similarity between user input and each category
    cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    # Find the index of the most similar category
    most_similar_index = cosine_similarities.argsort()[0][-1]  # Get index of the highest similarity
    most_similar_category = categories.iloc[most_similar_index]['Category']

    # Check if there was an exact match
    for index, row in df.iterrows():
        if isinstance(row['Combined'], str) and row['Combined'].lower().find(user_input) != -1:
            return row['Category']

    return most_similar_category  # Return the most similar category if no exact match is found

def is_upper_outlier(amount, category, models):
    if category not in models:
        raise ValueError(f"Model for category '{category}' not found.")
    
    # Create a DataFrame for prediction
    input_data = pd.DataFrame([[amount]], columns=['Amount'])

    # Predict using the corresponding Isolation Forest model
    prediction = models[category].predict(input_data)
    return prediction[0] == -1  # -1 indicates an anomaly (outlier)

# API endpoint for budget classification
@app.route('/classify_budget', methods=['POST'])
def classify_budget():
    try:
        data = request.get_json()
        amount = data['amount']
        category_input = data['category']

        # Categorize the input based on keyword matching
        category = categorize_input(category_input, budget_df)

        # Check if the budget is an upper outlier
        if is_upper_outlier(amount, category, budget_models):
            # result = f"Alert: The budget amount of ₹{amount} is unusually high. Please confirm if you want to proceed."
            result = 0
        else:
            # result = f"The budget of ₹{amount} is acceptable."
            result = 1

        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)

# for category '{category}'