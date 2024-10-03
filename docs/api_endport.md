# 水耕食農教育平台 API 端口

Base URL: `https://api.hydroponic-edu.com/v1`

## 認證

- POST `/auth/login`
- POST `/auth/logout`
- POST `/auth/refresh-token`

## 用戶管理

- GET `/users/{id}`
- PUT `/users/{id}`
- POST `/users`
- DELETE `/users/{id}`

## 用戶綁定水耕系統

- POST `/users/bind-system`

## 水耕系統監控

- GET `/system/status`
- GET `/system/sensors`
- GET `/system/camera`

## 系統控制

- POST `/system/control/auto`
- POST `/system/control/manual`
- PUT `/system/settings`

## AI 助手

- POST `/ai/chat`
- GET `/ai/chat-history`

## 學習內容

- GET `/courses`
- GET `/courses/{id}`
- GET `/videos`
- GET `/videos/{id}`
- GET `/quizzes`
- POST `/quizzes/{id}/submit`

## 數據分析

- GET `/analytics/growth`
- GET `/analytics/environment`
- GET `/analytics/productivity`

## 作業與報告

- POST `/assignments`
- GET `/assignments`
- GET `/assignments/{id}`
- POST `/reports`
- GET `/reports`
- GET `/reports/{id}`

## 社群互動

- GET `/forum/topics`
- POST `/forum/topics`
- GET `/forum/topics/{id}/posts`
- POST `/forum/topics/{id}/posts`

## 系統管理（僅限管理員）

- GET `/admin/users`
- GET `/admin/system-logs`
- POST `/admin/system-maintenance`