# 水耕食農教育平台混合式資料庫模式 (MongoDB + Redis)

## MongoDB 集合

### 用戶集合 (users)

```json
{
  "_id": ObjectId,
  "username": String,
  "password": String,  // 加密存儲
  "email": String,
  "role": String,  // "student", "teacher", "admin"
  "createdAt": Date,
  "updatedAt": Date
}
```

### 水耕系統集合 (hydroponic_systems)

```json
{
  "_id": ObjectId,
  "name": String,
  "location": String,
  "createdAt": Date,
  "updatedAt": Date,
  "currentStatus": {
    "temperature": Number,
    "humidity": Number,
    "ph": Number,
    "nutrientLevel": Number,
    "lightLevel": Number,
    "lastUpdated": Date
  },
  "plants": [
    {
      "species": String,
      "plantingDate": Date,
      "harvestDate": Date,
      "status": String  // "growing", "harvested", "removed"
    }
  ]
}
```

### 感應器數據集合 (sensor_data)

```json
{
  "_id": ObjectId,
  "systemId": ObjectId,  // 參考 hydroponic_systems
  "readings": [
    {
      "temperature": Number,
      "humidity": Number,
      "ph": Number,
      "nutrientLevel": Number,
      "lightLevel": Number,
      "recordedAt": Date
    }
  ]
}
```

### 圖像集合 (images)

```json
{
  "_id": ObjectId,
  "systemId": ObjectId,  // 參考 hydroponic_systems
  "url": String,
  "takenAt": Date
}
```

### AI 對話歷史集合 (ai_chat_history)

```json
{
  "_id": ObjectId,
  "userId": ObjectId,  // 參考 users
  "conversations": [
    {
      "message": String,
      "response": String,
      "createdAt": Date
    }
  ]
}
```

### 課程集合 (courses)

```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "content": String,
  "videos": [
    {
      "title": String,
      "description": String,
      "url": String,
      "duration": Number
    }
  ],
  "quizzes": [
    {
      "title": String,
      "description": String,
      "questions": [
        {
          "question": String,
          "options": [String],
          "correctAnswer": String
        }
      ]
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

### 作業集合 (assignments)

```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "dueDate": Date,
  "submissions": [
    {
      "userId": ObjectId,  // 參考 users
      "content": String,
      "submittedAt": Date,
      "grade": Number,
      "feedback": String
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

### 論壇集合 (forum)

```json
{
  "_id": ObjectId,
  "title": String,
  "content": String,
  "userId": ObjectId,  // 參考 users
  "createdAt": Date,
  "updatedAt": Date,
  "replies": [
    {
      "userId": ObjectId,  // 參考 users
      "content": String,
      "createdAt": Date
    }
  ]
}
```

### 系統日誌集合 (system_logs)

```json
{
  "_id": ObjectId,
  "systemId": ObjectId,  // 參考 hydroponic_systems
  "action": String,
  "details": String,
  "createdAt": Date
}
```

## Redis 緩存

1. 用戶會話緩存:
   - Key: `session:{sessionId}`
   - Value: 序列化的用戶會話數據
   - Expiration: 根據會話持續時間設置

2. 水耕系統即時狀態緩存:
   - Key: `hydroponic:status:{systemId}`
   - Value: 哈希存儲最新的感應器數據
   - Expiration: 設置較短的過期時間,確保數據及時更新

3. AI 對話上下文緩存:
   - Key: `ai:context:{userId}`
   - Value: 列表存儲最近的對話歷史
   - Expiration: 根據對話會話時長設置

4. 課程內容緩存:
   - Key: `course:{courseId}`
   - Value: 序列化的課程內容
   - Expiration: 根據內容更新頻率設置較長的過期時間

5. 論壇熱門主題緩存:
   - Key: `forum:hot_topics`
   - Value: 有序集合(Sorted Set)存儲熱門主題 ID 和分數
   - Expiration: 定期更新,無固定過期時間

6. 用戶測驗結果緩存:
   - Key: `quiz:result:{userId}:{quizId}`
   - Value: 哈希存儲測驗結果
   - Expiration: 根據結果有效期設置

7. 系統警報緩存:
   - Key: `alerts:{systemId}`
   - Value: 列表存儲最近的系統警報
   - Expiration: 根據警報重要性設置

設計說明:

1. MongoDB 用於存儲結構化和半結構化數據,利用其靈活的文檔模型。
2. Redis 用於緩存頻繁訪問的數據和需要快速讀寫的臨時數據。
3. 感應器數據在 MongoDB 中以陣列形式存儲歷史記錄,而最新狀態緩存在 Redis 中。
4. 課程、作業和論壇等較大的數據結構存儲在 MongoDB 中,可以緩存其部分內容到 Redis 以提高讀取速度。
5. 利用 Redis 的數據結構如列表、哈希和有序集合來優化特定場景的數據存取。