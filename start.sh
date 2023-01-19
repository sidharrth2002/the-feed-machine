cd app && npm start &
cd nlp && workon multitask-bert && uvicorn main:app --reload --port 8080 &
cd server && yarn run dev