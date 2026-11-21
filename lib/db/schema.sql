-- Анонимные результаты для сравнения «у вас выше, чем у N% прошедших».
-- Без персональных данных: только тест, метрики, код ответов и время.
-- Применяется автоматически при первом обращении к БД (lib/db/index.ts).
CREATE TABLE IF NOT EXISTS quiz_results (
	id BIGSERIAL PRIMARY KEY,
	quiz TEXT NOT NULL,
	kind TEXT NOT NULL,
	main REAL,
	scales JSONB NOT NULL DEFAULT '{}'::jsonb,
	type TEXT,
	answers TEXT NOT NULL,
	duration_sec INTEGER,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_results_quiz_idx ON quiz_results (quiz, created_at DESC);
