/**
 * Реестр тестов. Один файл на тест, здесь только импорт и список.
 * Порядок — как в content/quizzes/slugs.ts (по категориям).
 * Добавление теста: .claude/skills/new-quiz/SKILL.md
 */
import type { AnyQuiz } from '@/lib/quiz/types'

import personalityType from './personality-type'
import temperament from './temperament'
import introvertExtrovert from './introvert-extrovert'
import stressLevel from './stress-level'
import anxietyLevel from './anxiety-level'
import emotionalIntelligence from './emotional-intelligence'
import emotionalStability from './emotional-stability'
import mentalResilience from './mental-resilience'
import selfEsteem from './self-esteem'
import impostorSyndrome from './impostor-syndrome'
import perfectionism from './perfectionism'
import attachmentStyle from './attachment-style'
import loveLanguage from './love-language'
import communicationStyle from './communication-style'
import conflictStyle from './conflict-style'
import socialIntelligence from './social-intelligence'
import workMotivation from './work-motivation'
import managementStyle from './management-style'
import salesPotential from './sales-potential'
import entrepreneurship from './entrepreneurship'
import workLifeBalance from './work-life-balance'
import learningStyle from './learning-style'
import memoryType from './memory-type'
import decisionMaking from './decision-making'
import creativity from './creativity'
import cognitiveBiases from './cognitive-biases'
import procrastination from './procrastination'
import timeManagement from './time-management'
import chronotype from './chronotype'
import dopamineDetox from './dopamine-detox'
import digitalHabits from './digital-habits'
import riskProfile from './risk-profile'
import financialLiteracy from './financial-literacy'
import financialCushion from './financial-cushion'

export const QUIZZES: AnyQuiz[] = [
	personalityType,
	temperament,
	introvertExtrovert,
	stressLevel,
	anxietyLevel,
	emotionalIntelligence,
	emotionalStability,
	mentalResilience,
	selfEsteem,
	impostorSyndrome,
	perfectionism,
	attachmentStyle,
	loveLanguage,
	communicationStyle,
	conflictStyle,
	socialIntelligence,
	workMotivation,
	managementStyle,
	salesPotential,
	entrepreneurship,
	workLifeBalance,
	learningStyle,
	memoryType,
	decisionMaking,
	creativity,
	cognitiveBiases,
	procrastination,
	timeManagement,
	chronotype,
	dopamineDetox,
	digitalHabits,
	riskProfile,
	financialLiteracy,
	financialCushion
]
