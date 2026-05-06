import React, { useMemo, useState } from "react";
import {
  BrainCircuit,
  LineChart,
  BarChart3,
  Bot,
  Layers,
  ShieldAlert,
  Rocket,
  Copy,
  Check,
  Trophy,
  PlayCircle,
  MonitorSmartphone,
  Cpu,
  Sparkles,
  TerminalSquare,
  ChevronDown,
  CheckCircle2,
  XCircle,
  CircleDot,
  AlertTriangle,
  Compass,
  Workflow,
  Database,
  Code2,
  ClipboardCheck,
  Gauge,
} from "lucide-react";

const missions = [
  {
    id: "m1",
    label: "Mission 1",
    title: "AI 技術分析雷達",
    status: "Starter",
    icon: LineChart,
    color: "blue",
    description:
      "使用 Python 下載股價資料，計算 SMA、RSI、MACD 與布林通道，並用 AI 協助解讀趨勢、動能與波動。",
    goal: "完成一個可以輸入股票代號與分析期間的技術分析模組，輸出價格走勢、均線、RSI、MACD、布林通道圖，並產生教學式 AI 解讀。",
    tools: [
      "Python",
      "pandas",
      "yfinance",
      "ta",
      "matplotlib",
      "Prompt",
      "Streamlit",
    ],
    steps: [
      "下載股價資料，整理 Open、High、Low、Close、Volume。",
      "計算 SMA20、SMA60、RSI、MACD 與布林通道。",
      "繪製價格線、均線、RSI、MACD 與布林通道圖。",
      "請 AI 根據指標輸出趨勢、動能與波動說明。",
      "把結果整理成 Streamlit 頁面區塊。",
    ],
    prompts: [
      {
        title: "Prompt 1：請 AI 規劃技術分析流程",
        content: `你是一位熟悉 Python 的財務分析師。
    
    請幫我規劃一個技術分析流程。
    
    分析標的：請由使用者自行輸入，例如 2330.TW、2317.TW、AAPL、MSFT、NVDA、TSM。
    資料期間：請由使用者自行輸入，例如 2023-01-01 到今天。
    
    請包含：
    1. 需要下載哪些股價資料欄位。
    2. 應該計算哪些技術指標。
    3. SMA20、SMA60、RSI14、MACD、布林通道的意義。
    4. 應該畫出哪些圖表。
    5. 如何從圖表觀察趨勢、動能、波動與風險。
    6. 技術分析有哪些限制。
    
    請不要直接給買進或賣出建議。`,
      },
      {
        title: "Prompt 2：請 AI 產生 Colab 程式碼",
        content: `你是一位熟悉 Python 的財務分析師。
    
    請幫我寫一份可以在 Google Colab 執行的完整 Python 程式碼。
    
    程式需要讓使用者自行設定：
    1. 股票代號 ticker，例如 2330.TW、2317.TW、AAPL、MSFT、NVDA、TSM。
    2. 開始日期 start_date。
    3. 結束日期 end_date。
    
    資料來源：yfinance。
    
    請特別注意：
    1. 使用 yfinance 下載資料時，請設定 auto_adjust=False、progress=False。
    2. 請先印出 df.columns，確認實際欄位名稱。
    3. 如果 yfinance 回傳 MultiIndex 欄位，請自動轉成一般欄位。
    4. 所有技術指標請使用 Close 欄位計算。
    5. 請確保 close = df["Close"] 是一維 pandas Series。
  
    
    請完成：
    1. 安裝並匯入 yfinance、pandas、numpy、matplotlib、ta。
    2. 下載 Open、High、Low、Close、Volume 股價資料。
    3. 計算 SMA20、SMA60、RSI14、MACD、MACD signal、MACD diff、布林通道。
    4. 計算日報酬率、累積財富指數與回撤 Drawdown。
    5. 畫出收盤價與均線、RSI、MACD、布林通道、成交量、日報酬率分布與回撤圖。
    6. 產生規則式技術分析摘要。
    7. 加入中文註解。
    8. 提醒本分析不構成投資建議。

    這個區塊不需要截圖，而是請 Python 自動整理以下內容，方便我直接複製貼回 Gemini：

    一、基本資訊
    1. 股票代號
    2. 分析期間
    3. 最新資料日期
    4. 最新收盤價
    
    二、最新技術指標
    1. SMA20
    2. SMA60
    3. RSI14
    4. MACD
    5. MACD signal
    6. 布林通道上緣
    7. 布林通道下緣
    
    三、報酬與風險
    1. 平均日報酬率
    2. 日報酬率標準差
    3. 期間累積報酬率
    4. 目前回撤
    5. 樣本期間最大回撤
    6. 日報酬率偏態
    7. 日報酬率峰態
    
    四、圖表文字觀察
    請根據 Python 計算結果，自動產生以下文字觀察：
    1. 收盤價與 SMA20、SMA60 的相對位置。
    2. SMA20 與 SMA60 是否呈現多頭排列、空頭排列或整理狀態。
    3. RSI 是否位於超買、超賣或中性區間。
    4. MACD 是否高於 Signal 線。
    5. 價格是否接近或突破布林通道上緣或下緣。
    6. 日報酬率分布是否出現明顯極端值。
    7. 回撤圖是否顯示近期有較大資金壓力。
    
    五、請將以上內容整理成一段完整文字，變數名稱為 gemini_summary。
    
    最後請用以下方式輸出，方便我直接複製：
    
    from IPython.display import display, Markdown
    display(Markdown("## 可貼回 Gemini 的分析摘要"))
    display(Markdown(gemini_summary)`,
      },
      {
        title: "Prompt 3：請 AI 解釋 Python 結果",
        content: `以下是我用 Python 跑出的技術指標結果與規則式摘要。
    
    請你扮演財務分析師，幫我撰寫一段教學用技術分析解讀。
    
    請分析：
    1. 股價趨勢。
    2. 均線排列。
    3. RSI 動能狀態。
    4. MACD 動能變化。
    5. 布林通道反映的波動。
    6. 成交量變化。
    7. 日報酬率分布與回撤風險。
    8. 技術分析限制。
    
    請不要直接給買進、賣出、加碼、減碼、停損或停利建議。
    請提醒本分析不構成投資建議。
    
    股票代號：
    資料期間：
    以下是 Python 自動整理的分析摘要：
    【請貼上 Colab 最後輸出的「可貼回 Gemini 的分析摘要」】`,
      },
    ],

    colab:
      "在 Colab 中先完成資料下載、技術指標計算與圖表繪製。確認每一個指標欄位沒有大量缺漏值，再將核心函數整理成可重複呼叫的模組。",
    streamlit:
      "建立股票代號輸入框、期間選單、技術指標勾選區、圖表顯示區與 AI 解讀區。",
    checklist: [
      "可以成功輸入股票代號",
      "可以計算 SMA、RSI、MACD、布林通道",
      "可以產生至少三張圖",
      "可以用 Prompt 生成教學式解讀",
      "有加入非投資建議聲明",
    ],
    risk: "技術指標是落後或同步資訊，不能保證未來價格走勢。RSI、MACD、均線交叉都可能出現假訊號。",
  },
  {
    id: "m2",
    label: "Mission 2",
    title: "策略回測引擎",
    status: "Core",
    icon: BarChart3,
    color: "purple",
    description: "建立 SMA20/SMA60 策略，和 Buy and Hold 比較績效。",
    goal: "建立一個基礎策略回測模組，讓使用者理解交易訊號、報酬計算、績效比較。",
    tools: ["Python", "pandas", "numpy", "matplotlib", "Streamlit"],
    steps: [
      "建立 SMA20 與 SMA60。",
      "當 SMA20 大於 SMA60 時，設定持有部位。",
      "使用 position.shift(1) 避免使用未來資訊。",
      "計算策略日報酬與 Buy and Hold 日報酬。",
      "比較累積報酬、年化報酬、波動度、Sharpe Ratio 與最大回撤。",
    ],
    prompts: [
      {
        title: "Prompt 1：請 AI 規劃策略回測流程",
        content: `你是一位熟悉 Python 與投資策略回測的財務分析師。
    
    請幫我規劃一個 SMA20/SMA60 均線交叉策略的回測流程。
    
    策略規則如下：
    1. 當 SMA20 > SMA60 時，隔日持有股票。
    2. 當 SMA20 <= SMA60 時，隔日空手。
    3. 使用每日收盤價計算報酬。
    4. 加入單邊交易成本 0.1425%。
    5. 與 Buy and Hold 策略比較。
    
    分析標的：請由使用者自行輸入，例如 2330.TW、AAPL、MSFT、NVDA、TSM。
    資料期間：請由使用者自行輸入，例如 2020-01-01 到今天。
    
    請說明：
    1. 為什麼要使用 shift(1) 避免未來函數偏誤。
    2. 交易成本如何影響策略績效。
    3. 需要計算哪些績效指標。
    4. 年化報酬率、年化波動率、Sharpe Ratio、最大回撤、VaR、CVaR 的意義。
    5. 回測有哪些限制。
    
    請不要宣稱策略未來一定有效。`,
      },
      {
        title: "Prompt 2：請 AI 產生 Colab 回測程式碼",
        content: `你是一位熟悉 Python 與投資策略回測的財務分析師。
    
    請幫我寫一份可以在 Google Colab 執行的 Python 回測程式。
    
    程式需要讓使用者自行設定：
    1. 股票代號 ticker，例如 2330.TW、AAPL、MSFT、NVDA、TSM。
    2. 開始日期 start_date。
    3. 結束日期 end_date。
    
    資料來源：yfinance。
    
    請完成以下需求：
    1. 使用 yfinance 下載股價資料，並設定 auto_adjust=False、progress=False。
    2. 使用 Close 欄位計算日報酬率。
    3. 計算 SMA20 與 SMA60。
    4. 建立均線交叉策略：
       - SMA20 > SMA60 時，隔日持有股票。
       - SMA20 <= SMA60 時，隔日空手。
    5. 請務必使用 shift(1) 避免未來函數偏誤。
    6. 加入單邊交易成本 0.1425%。
    7. 計算 Buy and Hold 累積財富與 Strategy 累積財富。
    8. 計算年化報酬率、年化波動率、Sharpe Ratio、最大回撤、日 VaR 5%、日 CVaR 5%、交易次數。
    9. 畫出 Buy and Hold vs Strategy 累積財富曲線。
    10. 畫出 Strategy 回撤圖。
    11. 輸出績效比較表。
    12. 加入中文註解。
    13. 提醒本分析不構成投資建議。
    
    請在程式最後新增一個區塊，標題為：「產生可貼回 Gemini 的回測摘要」。

這個區塊不需要截圖，而是請 Python 自動整理以下內容，方便我直接複製貼回 Gemini：

一、基本資訊
1. 股票代號
2. 分析期間
3. 回測策略名稱
4. 交易成本假設
5. 是否使用 shift(1)

二、Buy and Hold 績效
1. 年化報酬率
2. 年化波動率
3. Sharpe Ratio
4. 最大回撤
5. 日 VaR 5%
6. 日 CVaR 5%

三、SMA20/SMA60 策略績效
1. 年化報酬率
2. 年化波動率
3. Sharpe Ratio
4. 最大回撤
5. 日 VaR 5%
6. 日 CVaR 5%
7. 交易次數

四、策略比較文字觀察
請根據 Python 計算結果，自動產生以下文字觀察：
1. 策略累積財富是否高於 Buy and Hold。
2. 策略年化報酬率是否高於 Buy and Hold。
3. 策略波動率是否高於 Buy and Hold。
4. 策略 Sharpe Ratio 是否高於 Buy and Hold。
5. 策略最大回撤是否低於 Buy and Hold。
6. 策略 VaR 與 CVaR 是否顯示較高或較低的尾部風險。
7. 交易次數是否可能造成交易成本壓力。
8. 回撤圖是否顯示策略曾經承受較大資金壓力。
9. 請提醒回測不代表未來績效。

五、請將以上內容整理成一段完整文字，變數名稱為 backtest_summary。

最後請用以下方式輸出，方便我直接複製：

from IPython.display import display, Markdown
display(Markdown("## 可貼回 Gemini 的回測摘要"))
display(Markdown(backtest_summary)) `,
      },
      {
        title: "Prompt 3：請 AI 解釋回測結果",
        content: `以下是我用 Python 跑出的 SMA20/SMA60 均線交叉策略回測結果。
    
    請你扮演財務分析師，幫我撰寫一段教學用回測分析。
    
    請包含：
    1. 策略是否優於 Buy and Hold。
    2. 年化報酬率是否具有吸引力。
    3. 年化波動率與 Sharpe Ratio 的意義。
    4. 最大回撤代表什麼投資壓力。
    5. VaR 與 CVaR 代表什麼風險。
    6. 交易成本可能如何影響策略績效。
    7. 是否可能存在樣本期間偏誤或過度配適。
    8. 為什麼不能只看報酬率。
    9. 明確說明本分析不構成投資建議。
    
    股票代號：
    資料期間：
    以下是 Python 自動整理的回測摘要：
    【請貼上 Colab 最後輸出的「可貼回 Gemini 的回測摘要」】`,
      },
    ],
    colab:
      "在 Colab 中建立回測流程，特別檢查交易訊號是否有 shift(1)。將績效指標整理成表格，並輸出權益曲線。",
    streamlit:
      "建立策略參數輸入區，例如短天期均線、長天期均線、交易成本假設，並顯示績效表與累積報酬圖。",
    checklist: [
      "策略訊號有使用 shift(1)",
      "有計算策略與 Buy and Hold 報酬",
      "有畫出累積報酬比較圖",
      "有輸出績效指標表",
      "有說明回測限制",
    ],
    risk: "回測容易受到資料探勘、參數過度配適、交易成本低估與未來函數偏誤影響。",
  },
  {
    id: "m3",
    label: "Mission 3",
    title: "AI 個股研究報告",
    status: "AI Report",
    icon: Bot,
    color: "pink",
    description:
      "整合任務一與任務二的技術指標與回測結果，生成專業個股分析報告。",
    goal: "把技術指標、回測表現與風險資訊整合成一份具結構的 AI 股票研究報告。",
    tools: ["Python", "Gemini API", "Prompt Engineering", "Streamlit"],
    steps: [
      "完成 Mission 1，取得可貼回 Gemini 的技術分析摘要。",
      "完成 Mission 2，取得可貼回 Gemini 的回測摘要。",
      "請 AI 整理成個股報告素材包。",
      "將素材包貼入 Mission 3 Prompt 3。",
      "生成完整個股分析報告。",
      "檢查報告是否包含風險聲明，且沒有提供買賣建議、目標價或報酬保證。",
    ],
    prompts: [
      {
        title: "Prompt 1：請 AI 規劃個股分析報告架構",
        content: `你是一位熟悉技術分析、策略回測與投資報告撰寫的財務分析師。
    
    請幫我規劃一個 AI 個股分析報告的架構。
    
    這份報告不是投資建議，而是根據 Mission 1 的技術分析摘要與 Mission 2 的策略回測摘要，整理成一份股票分析報告。
    
    請規劃報告應包含：
    1. 分析標的與資料期間。
    2. 價格趨勢分析。
    3. 技術指標分析，包括 SMA、RSI、MACD、布林通道。
    4. 策略回測結果，包括 Buy and Hold 與 SMA20/SMA60 策略比較。
    5. 風險指標分析，包括最大回撤、VaR、CVaR。
    6. 資料與模型限制。
    7. 結論與風險聲明。
    
    請特別說明：
    1. AI 在這裡負責整理與解釋，不負責保證投資結果。
    2. 報告只能根據使用者提供的 Mission 1 與 Mission 2 摘要撰寫。
    3. 不應自行補充未提供的新聞、財報、產業資訊或即時市場資訊。
    4. 不得提供買進、賣出、加碼、減碼、停損、停利、目標價或報酬保證。`,
      },
      {
        title: "Prompt 2：請 AI 整合 Mission 1 與 Mission 2 摘要",
        content: `你是一位財務分析師。
    
    我已經完成以下兩個任務：
    
    Mission 1：AI 技術分析雷達
    Mission 2：策略回測引擎
    
    現在我要把兩個 Mission 的輸出整理成一份個股分析報告素材。
    
    請根據以下兩份摘要，幫我整理成「個股報告素材包」。
    
    【Mission 1 技術分析摘要】
    請貼上 Mission 1 最後輸出的「可貼回 Gemini 的技術分析摘要」。
    
    【Mission 2 回測摘要】
    請貼上 Mission 2 最後輸出的「可貼回 Gemini 的回測摘要」。
    
    請幫我整理成以下格式：
    
    一、分析標的與資料期間
    二、技術分析重點
    三、回測策略設定
    四、策略績效比較
    五、風險指標重點
    六、目前資料不足以判斷的部分
    七、報告撰寫限制
    
    請注意：
    1. 只能根據我提供的 Mission 1 與 Mission 2 摘要整理。
    2. 不要自行補充新聞、財報、產業資訊或即時市場資訊。
    3. 不要提供買進、賣出、加碼、減碼、停損或停利建議。
    4. 不要給目標價。
    5. 不要保證未來績效。
    6. 如果資料不足以支持某項判斷，請明確寫出「目前資料不足以判斷」。
    7. 請提醒本分析不構成投資建議。`,
      },
      {
        title: "Prompt 3：請 AI 產生個股分析報告",
        content: `你是一位財務分析師。
    
    請根據以下「個股報告素材包」，撰寫一份個股分析報告。
    
    請使用以下架構：
    一、分析標的與資料期間
    二、價格趨勢分析
    三、技術指標分析
    四、策略回測結果
    五、風險指標分析
    六、資料與模型限制
    七、結論與風險聲明
    
    請注意：
    1. 只能根據我提供的個股報告素材包撰寫。
    2. 不要自行補充新聞、財報、產業資訊或即時市場資訊。
    3. 不要提供買進、賣出、加碼、減碼、停損或停利建議。
    4. 不要給目標價。
    5. 不要保證未來績效。
    6. 不要把技術指標或回測結果解讀成絕對預測。
    7. 如果資料不足以支持某項判斷，請明確說明「目前資料不足以判斷」。
    8. 請明確說明本分析僅供實作與研究參考，不構成任何投資建議。
    9. 請提醒回測結果不代表未來績效。`,
      },
      {
        title: "素材 1：Mission 1 技術分析摘要範例",
        content: `可貼回 Gemini 的分析摘要
    
    一、基本資訊
    
    股票代號：2330.TW
    分析期間：2023-01-03 到 2024-05-30
    最新資料日期：2024-05-30
    最新收盤價：838.00
    
    二、最新技術指標
    
    SMA20：831.80
    SMA60：796.12
    RSI14：54.36
    MACD：19.3889
    MACD signal：19.5959
    布林通道上緣：889.42
    布林通道下緣：774.18
    
    三、報酬與風險
    
    平均日報酬率：0.1842%
    日報酬率標準差：1.5407%
    期間累積報酬率：84.99%
    目前回撤：-4.23%
    樣本期間最大回撤：-12.48%
    日報酬率偏態：0.61
    日報酬率峰態：4.38
    
    四、圖表文字觀察
    
    收盤價目前高於 SMA20，且高於 SMA60。
    均線呈現多頭排列（SMA20 > SMA60）。
    RSI 指標目前位於中性區間（30–70 之間）。
    MACD 目前低於或等於 Signal 線。
    價格目前位於布林通道內部。
    日報酬率分布出現明顯極端值，顯示可能存在暴漲或暴跌的長尾現象。
    回撤圖顯示近期資金壓力尚可，目前回撤在 10% 以內。
    
    免責聲明：以上為程式自動計算與規則式判讀之技術分析摘要，僅供學術與量化研究參考，不構成任何買進或賣出之投資建議。`,
      },
      {
        title: "素材 2：Mission 2 回測摘要範例",
        content: `可貼回 Gemini 的回測摘要
    
    一、基本資訊
    
    股票代號：2330.TW
    分析期間：2020-01-01 至 2024-05-01
    回測策略名稱：SMA20/SMA60 雙均線交叉策略
    交易成本假設：單邊 0.1425%
    是否使用 shift(1)：是，已避免未來函數偏誤。
    
    二、Buy and Hold 績效
    
    年化報酬率：29.86%
    年化波動率：27.27%
    Sharpe Ratio：1.02
    最大回撤：-45.68%
    日 VaR 5%：-2.48%
    日 CVaR 5%：-3.34%
    
    三、SMA20/SMA60 策略績效
    
    年化報酬率：20.71%
    年化波動率：20.77%
    Sharpe Ratio：0.90
    最大回撤：-39.68%
    日 VaR 5%：-1.93%
    日 CVaR 5%：-2.82%
    交易次數：15 次
    
    四、策略比較文字觀察
    
    策略的累積財富低於 Buy and Hold。
    策略的年化報酬率低於 Buy and Hold。
    策略的年化波動率低於 Buy and Hold，顯示其日常淨值震盪程度較低。
    策略的風險調整後報酬（Sharpe Ratio）低於 Buy and Hold。
    策略的最大回撤風險優於 Buy and Hold。
    在尾部風險方面，策略的日 VaR 與日 CVaR 較低，代表極端虧損風險相對較低。
    回測期間共發生 15 次交易，交易頻率適中，成本影響相對可控。
    從回撤圖可以看出，策略最大回撤為 -39.68%，代表回測期間內曾承受一定程度的資金回落壓力。
    
    重要提醒：歷史回測結果不代表未來績效，過往均線策略有效性可能因市場結構、波動度或趨勢性質改變而失效。本分析不構成投資建議。`,
      },
    ],
    colab:
      "在 Colab 中先把技術指標與回測結果整理成 dictionary 或 markdown 字串，模擬丟給 AI 產生報告。",
    streamlit:
      "建立一鍵產生 AI 報告按鈕，並將報告分成摘要、技術分析、回測分析、風險提醒四個區塊。",
    checklist: [
      "報告有固定結構",
      "報告有引用技術指標與績效數據",
      "報告沒有直接投資建議",
      "報告有風險提醒",
      "報告可複製或下載",
    ],
    risk: "AI 可能產生過度肯定或不精確的描述，因此所有 AI 文字都需要人工檢查。",
  },
  {
    id: "m4",
    label: "Mission 4",
    title: "智能投資組合",
    status: "Portfolio",
    icon: Layers,
    color: "cyan",
    description:
      "比較多檔股票，建立 AI Score，產生等權重、反波動與最小變異組合。",
    goal: "讓學生理解多資產比較、風險分散、權重配置與 AI Score 的設計邏輯。",
    tools: ["Python", "pandas", "numpy", "scipy", "Streamlit"],
    steps: [
      "輸入多檔股票代號。",
      "計算每檔股票的報酬、波動、最大回撤與技術面分數。",
      "建立簡化 AI Score。",
      "比較等權重、反波動權重與最小變異權重。",
      "輸出投資組合績效與風險圖。",
    ],
    prompts: [
      {
        title: "Prompt 1：請 AI 規劃投資組合流程",
        content: `你是一位熟悉 Python、投資組合理論與資產配置的財務分析師。
    
    請幫我規劃一個 AI 輔助選股與投資組合建構流程。
    
    分析標的：請由使用者自行輸入多檔股票，例如 2330.TW、2317.TW、2454.TW、2303.TW、AAPL、MSFT、NVDA、TSM。
    資料期間：請由使用者自行輸入，例如 2022-01-01 到今天。
    
    請規劃：
    1. 如何下載多檔股票價格資料。
    2. 如何計算每檔股票的日報酬率。
    3. 如何計算年化報酬率、年化波動率、Sharpe Ratio 與最大回撤。
    4. 如何建立簡易 AI Score。
    5. 如何比較等權重、反波動權重與最小變異權重。
    6. 如何畫出投資組合累積財富曲線。
    7. 如何解釋投資組合風險與限制。
    
    請不要直接給買進、賣出、加碼或減碼建議。`,
      },
      {
        title: "Prompt 2：請 AI 產生投資組合 Colab 程式碼",
        content: `你是一位熟悉 Python、投資組合理論與金融資料分析的財務分析師。
    
    請幫我寫一份可以在 Google Colab 執行的 Python 程式，用來完成 AI 輔助選股與投資組合建構。
    
    程式需要讓使用者自行設定：
    1. 多檔股票代號 tickers，例如 ["2330.TW", "2317.TW", "2454.TW", "2303.TW"] 或 ["AAPL", "MSFT", "NVDA", "TSM"]。
    2. 開始日期 start_date。
    3. 結束日期 end_date。
    
    資料來源：yfinance。
    
    請完成以下需求：
    1. 使用 yfinance 下載多檔股票資料，並設定 auto_adjust=False、progress=False、group_by="column"。
    2. 正確處理 yfinance MultiIndex 欄位，安全取出 Close 價格資料。
    3. 使用 close_prices 計算每檔股票的日報酬率。
    4. 計算每檔股票的年化報酬率、年化波動率、Sharpe Ratio、最大回撤。
    5. 計算最近 RSI14、最近 Close、最近 SMA20、最近 SMA60。
    6. 建立簡易 AI Score，總分 100 分：
       - Sharpe Ratio 越高分數越高，最高 40 分。
       - 最大回撤越小分數越高，最高 25 分。
       - RSI 在 40 到 70 之間給較佳分數，最高 15 分。
       - Close > SMA20 > SMA60 給趨勢分數，最高 20 分。
    7. 使用 records + dictionary 方式建立股票排名資料，避免 DataFrame 指派錯誤。
    8. 做 if 判斷時，請先把最新值轉成 float 純量。
    9. 輸出股票排名表。
    10. 建立三種投資組合權重：
        - 等權重。
        - 反波動權重。
        - 最小變異權重。
    11. 最小變異權重請使用 scipy.optimize.minimize。
    12. 計算每種投資組合的年化報酬率、年化波動率、Sharpe Ratio、最大回撤、VaR 5%、CVaR 5%。
    13. 畫出 AI Score 排名長條圖。
    14. 畫出三種投資組合累積財富曲線。
    15. 畫出投資組合權重長條圖。
    16. 產生一段可以貼給 AI 的投資組合分析 Prompt。
    17. 請加入中文註解。
    18. 請提醒本分析不構成投資建議。
    
    請在程式最後新增一個區塊，標題為：「產生可貼回 Gemini 的投資組合分析摘要」。

這個區塊不需要截圖，而是請 Python 自動整理以下內容，方便我直接複製貼回 Gemini：

一、基本資訊
1. 股票清單。
2. 分析期間。
3. 最新資料日期。
4. 使用的投資組合方法：等權重、反波動權重、最小變異權重。

二、單一股票風險報酬摘要
請整理每檔股票的：
1. 年化報酬率。
2. 年化波動率。
3. Sharpe Ratio。
4. 最大回撤。
5. 最近 RSI14。
6. 最近 Close。
7. 最近 SMA20。
8. 最近 SMA60。
9. AI Score。
10. AI Score 排名。
11. 趨勢狀態，例如 Close > SMA20 > SMA60 或其他狀態。

三、AI Score 觀察
請根據 Python 計算結果，自動產生以下文字觀察：
1. 哪些股票 AI Score 較高。
2. 哪些股票 AI Score 較低。
3. 高分股票可能是因為 Sharpe 較高、最大回撤較低、RSI 較健康或趨勢條件較佳。
4. 低分股票可能是因為波動較高、最大回撤較深、RSI 偏離理想區間或趨勢條件較弱。
5. 請提醒 AI Score 是教學用簡化分數，不代表真實投資價值。

四、投資組合權重摘要
請整理三種投資組合的權重：
1. 等權重。
2. 反波動權重。
3. 最小變異權重。

請自動產生以下文字觀察：
1. 哪些股票在反波動權重中權重較高。
2. 哪些股票在最小變異權重中權重較高。
3. 權重集中是否明顯。
4. 權重集中可能造成什麼風險。
5. 權重分散是否有助於降低單一股票風險。

五、投資組合績效摘要
請整理每種投資組合的：
1. 年化報酬率。
2. 年化波動率。
3. Sharpe Ratio。
4. 最大回撤。
5. VaR 5%。
6. CVaR 5%。

請自動產生以下文字觀察：
1. 哪一種投資組合年化報酬率較高。
2. 哪一種投資組合年化波動率較低。
3. 哪一種投資組合 Sharpe Ratio 較高。
4. 哪一種投資組合最大回撤較小。
5. 哪一種投資組合尾部風險較高或較低。
6. 三種方法的報酬與風險差異。
7. 是否有看到分散投資效果。
8. 是否可能受到樣本期間、估計誤差與相關性變化影響。

六、圖表文字觀察
請根據 Python 計算結果，自動產生以下文字觀察，不需要使用圖片：
1. AI Score 排名圖呈現哪些股票分數較高。
2. 三種投資組合累積財富曲線的相對表現。
3. 投資組合權重圖是否顯示權重集中或分散。
4. 三種投資組合的風險報酬取捨。

七、分析限制提醒
請提醒 Gemini：
1. 只能根據 Python 輸出的數據與文字觀察進行分析。
2. 不要自行補充未提供的新聞、財報、產業資訊或即時市場資訊。
3. 不要直接給買進、賣出、加碼、減碼、停損或停利建議。
4. 不要給目標價。
5. 不要保證未來績效。
6. AI Score 是教學用簡化分數，不代表投資推薦。
7. 最小變異權重容易受到樣本期間與估計誤差影響。
8. 分散投資不能完全消除系統性風險。
9. 請明確說明本分析不構成投資建議。

請將以上內容整理成一段完整文字，變數名稱為 portfolio_summary。

最後請用以下方式輸出，方便我直接複製：

from IPython.display import display, Markdown
display(Markdown("## 可貼回 Gemini 的投資組合分析摘要"))
display(Markdown(portfolio_summary))`,
      },
      {
        title: "Prompt 3：請 AI 解讀投資組合結果",
        content: `你是一位財務分析師。
    
    請根據我提供的 Python 投資組合分析結果，撰寫一份投資組合分析報告。
    
    請分析：
    1. 哪些股票年化報酬率較高。
    2. 哪些股票波動率較高。
    3. 哪些股票最大回撤較大。
    4. AI Score 排名的可能意義。
    5. AI Score 的限制。
    6. 等權重、反波動權重、最小變異權重的差異。
    7. 三種投資組合的報酬與風險差異。
    8. 投資組合是否有達到分散風險效果。
    9. 樣本期間與估計誤差的限制。
    10. 為什麼這不是投資建議。
    
    請不要直接給買進、賣出、加碼、減碼、停損或停利建議。
    請提醒本分析不構成投資建議。
    
    以下是 Python 自動整理的投資組合分析摘要：
    【請貼上 Colab 最後輸出的「可貼回 Gemini 的投資組合分析摘要」】`,
      },
    ],
    colab:
      "在 Colab 中先用 3 到 5 檔股票測試權重計算，確認權重總和為 1，並畫出不同投資組合的累積報酬。",
    streamlit:
      "建立股票清單輸入區、權重方法選單、AI Score 表格、投資組合比較圖。",
    checklist: [
      "可以輸入多檔股票",
      "可以計算單一股票風險報酬指標",
      "可以產生三種權重",
      "權重總和等於 1",
      "可以比較不同投資組合表現",
    ],
    risk: "分散投資不能完全消除系統性風險。最小變異組合也可能因估計誤差而產生不穩定權重。",
  },
  {
    id: "m5",
    label: "Mission 5",
    title: "風險管理",
    status: "Risk Lab",
    icon: ShieldAlert,
    color: "orange",
    description: "用蒙地卡羅模擬、VaR、CVaR、最大回撤與破產機率評估資金風險。",
    goal: "建立資金管理與風險模擬概念，讓使用者理解極端損失、回撤與部位大小的重要性。",
    tools: ["Python", "numpy", "pandas", "matplotlib", "Streamlit"],
    steps: [
      "設定初始資金、單筆風險比例與交易次數。",
      "使用隨機報酬模擬多條資金路徑。",
      "計算 VaR、CVaR、最大回撤與破產機率。",
      "比較不同部位大小對資金曲線的影響。",
      "產生風險控制教學報告。",
    ],
    prompts: [
      {
        title: "Prompt 1：請 AI 規劃股票風險管理與風險模擬流程",
        content: `你是一位熟悉 Python、yfinance、投資風險管理與蒙地卡羅模擬的財務分析師。
    
    請幫我規劃一個「股票歷史報酬 × 資金管理 × 蒙地卡羅風險模擬」流程。
    
    此流程不是用來預測股票漲跌，而是用來理解：
    1. 單一股票的歷史報酬波動。
    2. 每次投入比例如何影響資金曲線波動。
    3. 歷史報酬抽樣下可能出現的期末財富分布。
    4. 最大回撤、VaR、CVaR 與破產機率如何用來評估風險。
    5. 歷史報酬模擬不代表未來一定重演。
    
    請規劃：
    1. 使用者需要輸入哪些參數。
    2. 如何下載指定股票的歷史價格資料。
    3. 如何計算歷史日報酬率。
    4. 如何使用歷史日報酬率 bootstrap 抽樣產生多條資金曲線。
    5. 如何計算期末財富、最大回撤、VaR、CVaR 與破產機率。
    6. 應該畫出哪些圖表。
    7. 如何解讀單一股票風險、部位大小與資金管理風險。
    8. 這種模擬有哪些限制。
    
    請提醒本分析僅供課程實作與研究參考，不構成投資建議。`,
      },
      {
        title: "Prompt 2：請 AI 產生股票風險模擬 Colab 程式碼",
        content: `你是一位熟悉 Python、yfinance、蒙地卡羅模擬與投資風險管理的財務分析師。
    
    請幫我寫一份可以在 Google Colab 執行的 Python 程式，用來做「股票歷史報酬 × 資金管理 × 蒙地卡羅風險模擬」。
    
    這份程式的目標不是預測股票價格，而是根據指定股票的歷史日報酬率，模擬不同資金路徑下可能出現的期末財富、最大回撤、VaR、CVaR 與破產機率。
    
    程式需要讓使用者自行設定以下參數：
    1. 股票代號 ticker，例如 2330.TW、2317.TW、AAPL、MSFT、NVDA、TSM。
    2. 開始日期 start_date。
    3. 結束日期 end_date。
    4. 初始資金 initial_capital，例如 1,000,000。
    5. 每次投入比例 position_size，例如 10%。
    6. 每條路徑交易次數 n_trades，例如 100。
    7. 模擬路徑數 n_simulations，例如 1000。
    8. 破產門檻 ruin_threshold，例如期末資金低於初始資金的 50%。
    
    資料來源：yfinance。
    
    請完成以下需求：
    1. 使用 yfinance 下載股票資料，並設定 auto_adjust=False、progress=False。
    2. 請先印出 df.columns，確認實際欄位名稱。
    3. 如果 yfinance 回傳 MultiIndex 欄位，請自動轉成一般欄位。
    4. 使用 Close 欄位計算日報酬率。
    5. 移除缺漏值與無限值。
    6. 使用歷史日報酬率進行 bootstrap 抽樣，產生 n_simulations 條模擬資金路徑。
    7. 每次交易投入金額為當期資金乘以 position_size。
    8. 每次交易的損益率由歷史日報酬率隨機抽樣取得。
    9. 計算每條資金曲線的期末財富。
    10. 計算每條資金曲線的最大回撤。
    11. 計算平均期末財富、中位數、最低值、最高值。
    12. 計算破產機率。
    13. 計算平均最大回撤與最差最大回撤。
    14. 計算期末財富 VaR 5% 與 CVaR 5%。
    15. 畫出前 50 條資金曲線。
    16. 畫出期末財富分布圖。
    17. 畫出最大回撤分布圖。
    18. 輸出風險模擬統計表。
    19. 加入中文註解。
    20. 請提醒本分析不構成投資建議。
    
    請在程式最後新增一個區塊，標題為：「產生可貼回 Gemini 的股票風險模擬摘要」。
    
    這個區塊不需要截圖，而是請 Python 自動整理以下內容，方便我直接複製貼回 Gemini：
    
    一、分析標的與資料期間
    1. 股票代號。
    2. 分析期間。
    3. 歷史樣本日數。
    4. 平均日報酬率。
    5. 日報酬率標準差。
    6. 歷史最大單日跌幅。
    7. 歷史最大單日漲幅。
    
    二、模擬參數
    1. 初始資金。
    2. 每次投入比例。
    3. 每條路徑交易次數。
    4. 模擬路徑數。
    5. 破產門檻。
    6. 模擬方式：使用歷史日報酬率 bootstrap 抽樣。
    
    三、期末財富統計
    1. 平均期末財富。
    2. 期末財富中位數。
    3. 最低期末財富。
    4. 最高期末財富。
    5. 期末財富 VaR 5%。
    6. 期末財富 CVaR 5%。
    
    四、回撤與破產風險
    1. 平均最大回撤。
    2. 最差最大回撤。
    3. 破產機率。
    4. 是否出現大量路徑低於初始資金。
    5. 是否出現資金曲線高度分散的現象。
    
    五、風險文字觀察
    請根據 Python 計算結果，自動產生以下文字觀察：
    1. 這檔股票的歷史日報酬波動是否較大。
    2. 每次投入比例是否可能過高。
    3. 歷史報酬抽樣下，期末財富分布是否分散。
    4. 最大回撤對資金壓力與心理壓力的意義。
    5. VaR 與 CVaR 反映何種尾部風險。
    6. 破產機率是否值得注意。
    7. 若降低 position_size，可能如何改善風險。
    8. 為什麼單一股票風險不能只看平均報酬。
    9. 為什麼歷史報酬模擬不代表未來一定重演。
    
    六、分析限制提醒
    請提醒 Gemini：
    1. 只能根據 Python 輸出的數據與文字觀察進行分析。
    2. 不要直接給買進、賣出、加碼、減碼、停損或停利建議。
    3. 不要保證未來績效。
    4. 歷史日報酬率 bootstrap 模擬高度依賴樣本期間。
    5. 若樣本期間沒有涵蓋極端事件，尾部風險可能被低估。
    6. 請明確說明本分析不構成投資建議。
    
    請將以上內容整理成一段完整文字，變數名稱為 stock_risk_summary。
    
    最後請用以下方式輸出，方便我直接複製：
    
    from IPython.display import display, Markdown
    display(Markdown("## 可貼回 Gemini 的股票風險模擬摘要"))
    display(Markdown(stock_risk_summary))`,
      },
      {
        title: "Prompt 3：請 AI 解讀股票風險模擬結果",
        content: `你是一位財務分析師。
    
    以下是我用 Python 跑出的 Mission 5 股票歷史報酬與蒙地卡羅風險模擬結果。資料已由 Python 自動整理成文字摘要，不包含圖片截圖。
    
    請根據我提供的 Python 股票風險模擬摘要，撰寫一份風險管理分析。
    
    請使用以下架構：
    一、分析標的與資料期間
    二、歷史日報酬率特徵
    三、蒙地卡羅模擬設定
    四、期末財富分布分析
    五、最大回撤與破產機率分析
    六、VaR 與 CVaR 尾部風險分析
    七、部位大小與資金管理意涵
    八、模型假設與限制
    九、結論與風險聲明
    
    請分析：
    1. 這檔股票的歷史日報酬波動是否偏高。
    2. 期末財富分布是否分散。
    3. 每次投入比例是否可能造成較大資金波動。
    4. 最大回撤代表什麼心理與資金壓力。
    5. VaR 與 CVaR 的意義。
    6. 破產機率代表什麼。
    7. 為什麼降低 position_size 可能降低風險。
    8. 為什麼單一股票風險不能只看平均報酬。
    9. 歷史日報酬率 bootstrap 模擬有哪些限制。
    10. 為什麼這不是投資建議。
    
    請注意：
    1. 請只根據我提供的 Python 數據與文字觀察進行分析。
    2. 不要自行補充未提供的市場資訊。
    3. 不要直接給買進、賣出、加碼、減碼、停損或停利建議。
    4. 不要保證未來績效。
    5. 請提醒歷史報酬模擬高度依賴樣本期間。
    6. 請明確說明本分析僅供實作與研究參考，不構成任何投資建議。
    
    以下是 Python 自動整理的股票風險模擬摘要：
    【請貼上 Colab 最後輸出的「可貼回 Gemini 的股票風險模擬摘要」】`,
      },
    ],
    colab:
      "在 Colab 中建立 Monte Carlo 模擬函數，輸出多條資金路徑與風險指標。程式最後需自動產生可貼回 Gemini 的風險模擬摘要，讓使用者不需要截圖即可完成風險解讀。",
    streamlit:
      "建立股票代號與期間輸入區，下載歷史價格並以日報酬率 bootstrap 進行蒙地卡羅資金路徑模擬，顯示期末財富分布、最大回撤分布、破產機率與 AI 股票風險解讀。",
    checklist: [
      "可以輸入股票代號與分析期間",
      "可以下載指定股票歷史價格",
      "可以用歷史日報酬率進行 bootstrap 模擬",
      "可以設定初始資金、投入比例、交易次數、模擬路徑數與破產門檻",
      "可以計算 VaR 與 CVaR",
      "可以計算最大回撤",
      "可以估計破產機率",
      "可以自動產生可貼回 Gemini 的股票風險模擬摘要",
      "有加入非投資建議聲明",
    ],
    risk: "股票歷史報酬蒙地卡羅模擬高度依賴樣本期間。若樣本未涵蓋極端事件，尾部風險可能被低估；歷史報酬模擬不代表未來一定重演。",
  },
  {
    id: "m6",
    label: "Final Mission",
    title: "部署 AI 投資分析平台",
    status: "Deploy",
    icon: Rocket,
    color: "green",
    description: "用 Streamlit 與 Gemini API 把前面成果整合成網站。",
    goal: "把前五個任務整合成一個 Streamlit AI 智能投資分析平台。",
    tools: ["Streamlit", "Gemini API", "Python", "GitHub", "Cloud Deploy"],
    steps: [
      "建立 Streamlit 多頁式架構。",
      "整合技術分析、回測、AI 報告、投資組合與風險模擬。",
      "設定 Gemini API Key 的安全輸入方式。",
      "整理 requirements.txt。",
      "部署到 Streamlit Community Cloud 或其他平台。",
    ],
    prompts: [
      {
        title: "Final Prompt 1：請 AI 規劃 Streamlit AI 投資分析平台",
        content: `你是一位熟悉 Streamlit、Python、金融互動式分析、Gemini API 與金融分析平台設計的系統設計顧問。
    
    請幫我規劃一個「AI 智能投資分析平台」的 Streamlit 網站架構。
    
    這個平台不是投資建議工具平台。
    
    平台需要整合前五個任務：
    1. Mission 1：AI技術分析模組。
    2. Mission 2：策略回測模組。
    3. Mission 3：AI 個股研究報告模組。
    4. Mission 4：智能投資組合模組。
    5. Mission 5：風險管理模組。
    
    請規劃：
    1. 專案資料夾結構。
    2. app.py 首頁應放哪些內容。
    3. pages 資料夾應包含哪些頁面。
    4. 每一頁應該有哪些輸入元件。
    5. 每一頁應該輸出哪些表格、圖表與文字解讀。
    6. 哪些功能由 Python 計算。
    7. 哪些內容適合交給 Gemini API 生成文字。
    8. Gemini API Key 應如何安全處理。
    9. requirements.txt 應包含哪些套件。
    10. 如何加入風險聲明與非投資建議聲明。
    11. 如何設計成適合課堂展示的互動式平台。
    
    請特別提醒：
    1. 不要把 Gemini API Key 寫死在程式中。
    2. 不要讓 AI 直接給買賣建議、目標價或報酬保證。
    3. 所有分析都必須標示僅供課程實作、研究與資訊展示參考。
    4. 平台應清楚區分 Python 計算結果與 AI 文字解讀。`,
      },
      {
        title: "Final Prompt 2：請 AI 產生全自動 Streamlit app.py",
        content: `你是一位熟悉 Streamlit、Python、金融資料分析、yfinance、技術指標、策略回測、投資組合、蒙地卡羅模擬與 Gemini API 串接的 Python 開發者。
      
      請幫我產生一份「可以直接複製到 app.py 執行」的單一檔案版 Streamlit 程式碼。
      
      網站名稱：AI 智能投資分析平台
      
      我想要的網站風格是互動式分析平台：
      1. 使用者可以自己輸入股票代號。
      2. 使用者可以自己選擇開始日期與結束日期。
      3. 使用者可以按一個按鈕，自動下載資料、自動計算、自動畫圖、自動產生 AI 分析。
      4. 不要要求使用者手動複製 Prompt、貼到 Gemini、再貼回網站。
      5. Gemini API 如果已設定，就由網站自動呼叫 Gemini 產生分析結果。
      6. Gemini API 如果沒有設定，頁面只顯示「尚未設定 Gemini API Key，AI 分析暫時無法使用」，不要讓程式崩潰。
      7. 不要在網站畫面底部顯示 requirements.txt 安裝提醒。
      8. 不要在網站畫面底部顯示 .streamlit/secrets.toml 或 GEMINI_API_KEY 設定教學。
      9. 不要輸出專案資料夾架構。
      10. 不要拆成多個檔案。
      11. 只輸出一份完整 app.py 程式碼。
      
      請使用 st.sidebar.radio 建立左側導覽選單，包含：
      1. 首頁
      2. Mission 1：AI 技術分析
      3. Mission 2：策略回測
      4. Mission 3：個股報告
      5. Mission 4：智能投資組合
      6. Mission 5：風險管理
      
      請在 app.py 開頭建立必要函數：
      1. get_gemini_response(prompt)
      2. flatten_columns(df)
      3. download_stock_data(ticker, start_date, end_date)
      4. calculate_indicators(df)
      5. calculate_drawdown(series)
      6. calculate_var_cvar(returns)
      7. calculate_performance(returns)
      8. run_backtest(df, short_window, long_window, transaction_cost)
      9. run_stock_risk_simulation(returns, initial_capital, position_size, n_trades, n_simulations, ruin_threshold)
      10. generate_technical_summary(...)
      11. generate_backtest_summary(...)
      12. generate_portfolio_summary(...)
      13. generate_stock_risk_summary(...)
      
      Gemini API 串接要求：
      1. 使用 google.generativeai。
      2. API Key 從 st.secrets["GEMINI_API_KEY"] 讀取。
      3. 模型名稱請固定使用 gemini-2.5-flash。
      4. 請在程式碼中寫成：
         model = genai.GenerativeModel("gemini-2.5-flash")
      5. 絕對不要使用 gemini-1.5-pro-latest、gemini-pro、gemini-1.0-pro 等舊模型名稱。
      6. 不可以把 API Key 寫死在程式碼裡。
      7. 如果沒有設定 API Key，get_gemini_response(prompt) 回傳 None。
      8. 各頁面若 response 為 None，顯示 st.info("尚未設定 Gemini API Key，AI 分析暫時無法使用。")
      9. 如果 Gemini API 回傳錯誤，請顯示實際錯誤訊息，不要誤判成 API Key 沒設定。
      10. 不要顯示如何設定 secrets.toml 的長篇教學文字。
      11. 呼叫 Gemini 前，必須在 prompt 裡加入限制：
         - 不得提供買進、賣出、加碼、減碼、停損或停利建議
         - 不得提供目標價
         - 不得保證未來績效
         - 只能根據 Python 計算結果進行分析
         - 必須提醒本分析不構成投資建議

      12. get_gemini_response(prompt) 函數請使用下列邏輯：

      def get_gemini_response(prompt):
          try:
              api_key = st.secrets.get("GEMINI_API_KEY", "")
              if not api_key:
                  return None
              import google.generativeai as genai
              genai.configure(api_key=api_key)
              model = genai.GenerativeModel("gemini-2.5-flash")
              safe_prompt = f"""
              你是一位財務分析師。請根據使用者提供的 Python 計算結果進行分析。
              請注意：
              1. 不要提供買進、賣出、加碼、減碼、停損或停利建議。
              2. 不要提供目標價。
              3. 不要保證未來績效。
              4. 只能根據使用者提供的數據進行分析。
              5. 請明確提醒本分析不構成投資建議。
              使用者資料如下：
              {prompt}
              """
              response = model.generate_content(safe_prompt)
              return response.text
          except Exception as e:
              return f"Gemini API 呼叫失敗：{e}"

      13. 呼叫 Gemini 前，必須在 prompt 裡加入限制：
         - 不得提供買進、賣出、加碼、減碼、停損或停利建議
         - 不得提供目標價
         - 不得保證未來績效
         - 只能根據 Python 計算結果進行分析
         - 必須提醒本分析不構成投資建議
      
      首頁要求：
      1. 顯示平台名稱「AI 智能投資分析平台」。
      2. 顯示五個 Mission 的簡介。
      3. 顯示免責聲明。
      4. 不要顯示 requirements.txt 或 API Key 設定教學。
      
      Mission 1：AI 技術分析
      請建立以下互動功能：
      1. 股票代號輸入框，預設 2330.TW。
      2. 開始日期與結束日期選擇器。
      3. 「開始技術分析」按鈕。
      4. 按下按鈕後，自動下載資料。
      5. 自動計算 SMA20、SMA60、RSI14、MACD、MACD signal、MACD diff、布林通道、日報酬率、累積財富指數、Drawdown。
      6. 顯示最新技術指標表。
      7. 畫出：
         - 收盤價與 SMA20、SMA60
         - RSI
         - MACD
         - 布林通道
         - Drawdown
      8. 自動產生技術分析摘要 technical_summary。
      9. 如果 Gemini API Key 已設定，按「產生 AI 技術分析解讀」後，自動呼叫 Gemini 並顯示分析結果。
      10. 不要要求使用者手動貼 Prompt。
      
      Mission 2：策略回測
      請建立以下互動功能：
      1. 股票代號輸入框，預設 2330.TW。
      2. 開始日期與結束日期選擇器。
      3. 短期均線輸入，預設 20。
      4. 長期均線輸入，預設 60。
      5. 單邊交易成本輸入，預設 0.001425。
      6. 「開始回測」按鈕。
      7. 建立均線交叉策略：
         - 短期均線 > 長期均線時，隔日持有股票。
         - 短期均線 <= 長期均線時，隔日空手。
      8. 必須使用 position.shift(1) 避免未來函數偏誤。
      9. 計算 Buy and Hold 與 Strategy 的：
         - 年化報酬率
         - 年化波動率
         - Sharpe Ratio
         - 最大回撤
         - 日 VaR 5%
         - 日 CVaR 5%
         - 交易次數
      10. 顯示績效比較表。
      11. 畫出：
         - Buy and Hold vs Strategy 累積財富曲線
         - Strategy Drawdown
      12. 自動產生回測摘要 backtest_summary。
      13. 如果 Gemini API Key 已設定，按「產生 AI 回測解讀」後，自動呼叫 Gemini 並顯示分析結果。
      
      Mission 3：個股報告
      請建立以下互動功能：
      1. 股票代號輸入框，預設 2330.TW。
      2. 開始日期與結束日期選擇器。
      3. 短期均線與長期均線輸入。
      4. 「產生個股報告」按鈕。
      5. 按下後自動執行 Mission 1 技術分析與 Mission 2 策略回測。
      6. 自動整合 technical_summary 與 backtest_summary。
      7. 自動產生 report_package。
      8. 如果 Gemini API Key 已設定，自動呼叫 Gemini 產生完整個股分析報告。
      9. 如果沒有 Gemini API Key，顯示 report_package，但不要要求使用者手動貼回。
      10. 報告架構包含：
         - 分析標的與資料期間
         - 價格趨勢分析
         - 技術指標分析
         - 策略回測結果
         - 風險指標分析
         - 資料與模型限制
         - 結論與風險聲明
      
      Mission 4：智能投資組合
      請建立以下互動功能：
      1. 多股票輸入框，預設：2330.TW, 2317.TW, 2454.TW, 2303.TW。
      2. 開始日期與結束日期選擇器。
      3. 「開始投資組合分析」按鈕。
      4. 自動下載多檔股票資料。
      5. 自動處理 MultiIndex 欄位並取得 Close 價格。
      6. 計算每檔股票：
         - 年化報酬率
         - 年化波動率
         - Sharpe Ratio
         - 最大回撤
         - RSI14
         - SMA20
         - SMA60
      7. 建立 AI Score，總分 100：
         - Sharpe Ratio 分數最高 40
         - 最大回撤分數最高 25
         - RSI 分數最高 15
         - 趨勢分數最高 20
      8. 建立三種投資組合：
         - 等權重
         - 反波動權重
         - 最小變異權重
      9. 最小變異權重使用 scipy.optimize.minimize。
      10. 顯示 AI Score 排名表。
      11. 顯示權重表。
      12. 顯示投資組合績效表。
      13. 畫出：
         - AI Score 排名圖
         - 三種投資組合累積財富曲線
         - 權重比較圖
      14. 自動產生 portfolio_summary。
      15. 如果 Gemini API Key 已設定，按「產生 AI 投資組合解讀」後，自動呼叫 Gemini 並顯示分析結果。
      
      Mission 5：風險管理
      請建立以下互動功能：
      1. 股票代號輸入框，預設 2330.TW。
      2. 開始日期與結束日期選擇器。
      3. 初始資金輸入。
      4. 每次投入比例輸入。
      5. 每條路徑交易次數輸入。
      6. 模擬路徑數輸入。
      7. 破產門檻輸入。
      8. 「開始股票風險模擬」按鈕。
      9. 使用 yfinance 下載指定股票的歷史價格。
      10. 使用 Close 計算歷史日報酬率。
      11. 使用歷史日報酬率 bootstrap 抽樣，進行蒙地卡羅資金路徑模擬。
      12. 每次交易投入金額為當期資金乘以 position_size。
      13. 計算：
          - 平均日報酬率
          - 日報酬率標準差
          - 歷史最大單日漲幅
          - 歷史最大單日跌幅
          - 平均期末財富
          - 期末財富中位數
          - 最低期末財富
          - 最高期末財富
          - VaR 5%
          - CVaR 5%
          - 平均最大回撤
          - 最差最大回撤
          - 破產機率
      14. 顯示風險統計表。
      15. 畫出：
          - 前 50 條資金曲線
          - 期末財富分布
          - 最大回撤分布
      16. 自動產生 stock_risk_summary。
      17. 如果 Gemini API Key 已設定，按「產生 AI 股票風險解讀」後，自動呼叫 Gemini 並顯示分析結果。
      
      畫圖要求：
      1. 使用 matplotlib。
      2. 每張圖使用 st.pyplot(fig) 顯示。
      3. 每張圖要有標題、座標軸名稱。
      4. 畫圖後要 plt.close(fig)，避免圖表重複。
      
      錯誤處理要求：
      1. 每個 Mission 都要用 try/except 包住主要流程。
      2. 如果股票代號錯誤，顯示清楚錯誤訊息。
      3. 如果資料不足以計算指標，顯示提示。
      4. 不要讓整個網站崩潰。
      
      頁面呈現要求：
      1. 使用 st.warning 顯示免責聲明。
      2. 使用 st.expander 顯示 AI 使用限制。
      3. 使用 st.dataframe 顯示表格。
      4. 使用 st.text_area 顯示自動產生的摘要。
      5. 不要在頁面底部顯示 requirements.txt 安裝說明。
      6. 不要在頁面底部顯示 secrets.toml 設定說明。
      7. 不要出現「請確保您的環境或 requirements.txt 中安裝了以下套件」這類文字。
      8. 不要出現「執行前請建立 .streamlit/secrets.toml」這類文字。
      
      最後請直接輸出完整 app.py 程式碼。
      不要輸出說明文字。
      不要輸出資料夾結構。
      不要輸出 requirements.txt。
      不要省略主要函數。
      不要只寫部分頁面。`,
      },
    ],
    colab:
      "Final Mission 不一定在 Colab 完成，而是將前五個任務的 Python 分析邏輯整理成可重複使用的函數，再搬到 Streamlit 專案資料夾中。",
    streamlit:
      "建立首頁、技術分析頁、策略回測頁、AI 個股報告頁、投資組合頁、風險模擬頁與風險聲明。進階版可使用 Gemini API 自動產生分析文字，但 API Key 必須透過 Streamlit Secrets 管理。",
    checklist: [
      "所有功能可以從側邊欄進入",
      "有建立 app.py 首頁",
      "有建立 pages 多頁式架構",
      "有整理 utils 共用函數",
      "requirements.txt 完整",
      "Gemini API Key 不寫死在程式碼中",
      "GitHub 不包含任何 secrets",
      "每一頁都有風險聲明",
      "部署後可以成功開啟",
    ],
    risk: "部署版本若開放給他人使用，需注意 Gemini API Key 安全、資料來源限制、模型輸出品質、免責聲明與使用者誤用風險。本平台僅供實作、研究與資訊展示參考，不構成任何投資建議。",
  },
];

const quizQuestions = [
  {
    question: "為什麼回測要使用 shift(1)？",
    options: [
      "讓策略使用今天收盤後才知道的訊號，在今天就交易",
      "避免使用未來資訊，讓今天的部位只能根據前一天已知訊號決定",
      "讓報酬率變得比較高",
      "讓圖表看起來更平滑",
    ],
    answer: 1,
    explanation:
      "shift(1) 的重點是避免 look-ahead bias。今天的交易部位不應該使用今天收盤後才知道的訊號。",
  },
  {
    question: "Sharpe Ratio 代表什麼？",
    options: [
      "每承擔一單位風險所得到的超額報酬",
      "策略的最大單日獲利",
      "策略勝率",
      "股票成交量變化",
    ],
    answer: 0,
    explanation:
      "Sharpe Ratio 衡量風險調整後報酬，常用來比較不同策略在承擔風險後的報酬效率。",
  },
  {
    question: "最大回撤代表什麼？",
    options: [
      "策略最高的單日報酬",
      "資金曲線從高點跌到低點的最大跌幅",
      "股票最高價與最低價的差距",
      "每年平均報酬",
    ],
    answer: 1,
    explanation:
      "最大回撤反映投資過程中可能遭遇的最大資金壓力，是風險管理的重要指標。",
  },
  {
    question: "為什麼勝率高不一定賺錢？",
    options: [
      "因為只要勝率高，一定會賺錢",
      "因為如果小賺很多次、一次大賠，總損益仍可能為負",
      "因為勝率和交易結果完全無關",
      "因為勝率只能用在債券市場",
    ],
    answer: 1,
    explanation:
      "策略績效不只看勝率，也要看平均獲利、平均虧損、賺賠比與尾部風險。",
  },
  {
    question: "Gemini API 在網站中負責什麼？",
    options: [
      "下載股票價格",
      "執行 Python 回測",
      "生成 AI 分析報告與教學式解讀",
      "取代所有風險管理",
    ],
    answer: 2,
    explanation:
      "在本系統架構中，Python 負責計算，Gemini API 負責把數據轉成結構化文字報告。",
  },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-title">
      <div className="eyebrow">
        <Sparkles size={16} />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function CodeBlock({ text }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <div>
          <TerminalSquare size={16} />
          Prompt Template
        </div>
        <button onClick={copyPrompt}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "已複製" : "複製"}
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <a href="#top" className="brand">
        <div className="brand-icon">
          <BrainCircuit size={22} />
        </div>
        <div>
          <strong>AI 智能投資</strong>
          <span>Mission Lab</span>
        </div>
      </a>

      <nav>
        <a href="#concept">核心概念</a>
        <a href="#mission">任務地圖</a>
        <a href="#detail">任務詳細</a>
        <a href="#quiz">小測驗</a>
        <a href="#final">最終成果</a>
      </nav>

      <a className="start-link" href="#mission">
        <Rocket size={16} />
        Start
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <BrainCircuit size={16} />
            AI Investment Quest: Prompt × Python × Streamlit × Gemini API
          </div>

          <h1>
            AI 智能投資
            <span>任務實驗室</span>
          </h1>

          <p>
            從 Prompt 到 Python，從技術指標到 AI
            投資報告，打造你的第一套智能投資分析系統。
          </p>

          <div className="hero-actions">
            <a href="#mission" className="primary-btn">
              <PlayCircle size={20} />
              開始任務
            </a>
            <a href="#final" className="secondary-btn">
              <MonitorSmartphone size={20} />
              前往分析工具
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>01</strong>
              <span>Prompt</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Python</span>
            </div>
            <div>
              <strong>03</strong>
              <span>AI Report</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-inner">
            <div className="panel-top">
              <div>
                <span>Quest Progress</span>
                <h3>AI Investor Lab</h3>
              </div>
              <div className="compass-icon">
                <Compass size={30} />
              </div>
            </div>

            <div className="progress-list">
              {missions.slice(0, 4).map((mission, index) => {
                const Icon = mission.icon;
                return (
                  <div className="progress-item" key={mission.id}>
                    <div className={`mission-icon ${mission.color}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="progress-title">
                        <strong>{mission.title}</strong>
                        <span>{25 + index * 15}%</span>
                      </div>
                      <div className="progress-bar">
                        <div style={{ width: `${25 + index * 15}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="panel-note">
              這不是實際交易工具，而是讓使用者完成 AI
              智能投資系統的互動式教材入口。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConceptCards() {
  const concepts = [
    {
      title: "Python 是計算引擎",
      icon: Cpu,
      badge: "Compute",
      text: "負責資料整理、技術指標計算、策略回測、投資組合權重與風險模擬。",
    },
    {
      title: "Gemini API 是報告引擎",
      icon: BrainCircuit,
      badge: "Explain",
      text: "負責把數據、圖表與績效結果轉換成有結構的 AI 分析報告與解讀。",
    },
    {
      title: "Streamlit 是展示平台",
      icon: MonitorSmartphone,
      badge: "Deploy",
      text: "負責把 Python 模組包裝成可以互動操作的網頁介面，讓使用者展示成果。",
    },
  ];

  return (
    <section id="concept" className="section">
      <SectionTitle
        eyebrow="Core Concept"
        title="三個引擎，組成一套 AI 智能投資分析"
        description="本課程不是要使用者背公式，而是讓使用者理解：Prompt 負責溝通需求，Python 負責精準計算，AI 負責生成解讀，Streamlit 負責展示成果。"
      />

      <div className="concept-grid">
        {concepts.map((item) => {
          const Icon = item.icon;
          return (
            <div className="concept-card" key={item.title}>
              <div className="concept-top">
                <div className="concept-icon">
                  <Icon size={30} />
                </div>
                <span>{item.badge}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MissionMap({ activeMission, setActiveMission }) {
  return (
    <section id="mission" className="section">
      <SectionTitle
        eyebrow="Mission Map"
        title="像破關一樣完成 AI 智能投資分析系統"
        description="每個任務都是一個可展示、可實作、可延伸的學習單元。使用者最後會得到一套完整的 Streamlit AI 投資分析平台原型。"
      />

      <div className="mission-map">
        {missions.map((mission, index) => {
          const Icon = mission.icon;
          return (
            <button
              className={`mission-card ${
                activeMission === mission.id ? "active" : ""
              }`}
              key={mission.id}
              onClick={() => {
                setActiveMission(mission.id);

                setTimeout(() => {
                  document.getElementById("detail")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 50);
              }}
            >
              <div className={`mission-icon ${mission.color}`}>
                <Icon size={26} />
              </div>

              <div className="mission-info">
                <div>
                  <span className="mission-label">{mission.label}</span>
                  <span className="mission-status">{mission.status}</span>
                </div>
                <h3>{mission.title}</h3>
                <p>{mission.description}</p>
              </div>

              <div className="mission-action">
                <div className="mini-progress">
                  <div
                    style={{ width: `${Math.min(100, 18 + index * 14)}%` }}
                  />
                </div>
                <span>
                  開始任務
                  <Rocket size={16} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MissionDetails({ activeMission, setActiveMission }) {
  const selected = missions.find((item) => item.id === activeMission);
  const [openBlock, setOpenBlock] = useState("goal");

  const blocks = [
    {
      id: "goal",
      title: "任務目標",
      icon: Trophy,
      content: <p>{selected.goal}</p>,
    },
    {
      id: "tools",
      title: "使用工具",
      icon: Code2,
      content: (
        <div className="tool-list">
          {selected.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      ),
    },
    {
      id: "steps",
      title: "操作流程",
      icon: Workflow,
      content: (
        <ol className="step-list">
          {selected.steps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "prompt",
      title: "Prompt 範例",
      icon: TerminalSquare,
      content: selected.prompts ? (
        <div className="prompt-stack">
          {selected.prompts.map((item, index) => (
            <div className="prompt-card" key={index}>
              <h4>{item.title}</h4>
              <CodeBlock text={item.content} />
            </div>
          ))}
        </div>
      ) : (
        <CodeBlock text={selected.prompt} />
      ),
    },
    {
      id: "colab",
      title: "Colab 實作說明",
      icon: Database,
      content: <p>{selected.colab}</p>,
    },
    {
      id: "streamlit",
      title: "Streamlit 對應功能",
      icon: MonitorSmartphone,
      content: <p>{selected.streamlit}</p>,
    },
    {
      id: "checklist",
      title: "完成檢核表",
      icon: ClipboardCheck,
      content: (
        <ul className="check-list">
          {selected.checklist.map((item) => (
            <li key={item}>
              <CheckCircle2 size={18} />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "risk",
      title: "風險提醒",
      icon: AlertTriangle,
      content: <div className="risk-box">{selected.risk}</div>,
    },
  ];

  const visibleBlocks =
    selected.id === "m6"
      ? blocks
      : blocks.filter(
          (block) => !["streamlit", "checklist"].includes(block.id)
        );

  return (
    <section id="detail" className="section">
      <SectionTitle
        eyebrow="Mission Detail"
        title="任務詳細頁"
        description="點選任務後，可以看到每個任務的目標、流程、Prompt、Colab 實作方式、Streamlit 對應功能與完成檢核。"
      />

      <div className="detail-layout">
        <aside className="mission-menu">
          <h4>任務選單</h4>
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <button
                key={mission.id}
                onClick={() => setActiveMission(mission.id)}
                className={selected.id === mission.id ? "active" : ""}
              >
                <Icon size={18} />
                {mission.title}
              </button>
            );
          })}
        </aside>

        <div className="detail-card">
          <div className="detail-head">
            <div>
              <div>
                <span className="mission-label">{selected.label}</span>
                <span className="mission-status">{selected.status}</span>
              </div>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
            </div>

            <div className={`detail-icon ${selected.color}`}>
              {React.createElement(selected.icon, { size: 34 })}
            </div>
          </div>

          <div className="accordion">
            {visibleBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <div className="accordion-item" key={block.id}>
                  <button
                    onClick={() =>
                      setOpenBlock(openBlock === block.id ? "" : block.id)
                    }
                  >
                    <span>
                      <Icon size={20} />
                      {block.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className={openBlock === block.id ? "rotate" : ""}
                    />
                  </button>

                  {openBlock === block.id && (
                    <div className="accordion-content">{block.content}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const score = useMemo(() => {
    return quizQuestions.reduce((total, q, index) => {
      return selectedAnswers[index] === q.answer ? total + 1 : total;
    }, 0);
  }, [selectedAnswers]);

  return (
    <section id="quiz" className="section">
      <SectionTitle
        eyebrow="Quick Quiz"
        title="互動小測驗"
        description="用五題小測驗確認學生是否理解回測、績效、風險與 AI 報告引擎的核心概念。"
      />

      <div className="score-card">
        <div>
          <span>Learning Score</span>
          <strong>
            {score} / {quizQuestions.length}
          </strong>
        </div>
        <div className="score-bar">
          <div style={{ width: `${(score / quizQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="quiz-list">
        {quizQuestions.map((q, qIndex) => {
          const chosen = selectedAnswers[qIndex];
          const hasAnswered = chosen !== undefined;
          const isCorrect = chosen === q.answer;

          return (
            <div className="quiz-card" key={q.question}>
              <h3>
                <CircleDot size={20} />
                {qIndex + 1}. {q.question}
              </h3>

              <div className="option-grid">
                {q.options.map((option, optionIndex) => {
                  const isSelected = chosen === optionIndex;
                  const isAnswer = q.answer === optionIndex;

                  let className = "option-btn";

                  if (hasAnswered && isSelected && isAnswer) {
                    className += " correct";
                  } else if (hasAnswered && isSelected && !isAnswer) {
                    className += " wrong";
                  } else if (hasAnswered && isAnswer) {
                    className += " answer";
                  }

                  return (
                    <button
                      key={option}
                      className={className}
                      onClick={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [qIndex]: optionIndex,
                        }))
                      }
                    >
                      {hasAnswered && isSelected ? (
                        isAnswer ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <XCircle size={18} />
                        )
                      ) : (
                        <span>{String.fromCharCode(65 + optionIndex)}</span>
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className={`quiz-feedback ${isCorrect ? "good" : "bad"}`}>
                  <strong>{isCorrect ? "答對了：" : "再想一下："}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalProject() {
  const outcomes = [
    "一份技術分析模組",
    "一份策略回測模組",
    "一份 AI 股票分析報告",
    "一份投資組合建構模組",
    "一份資金管理風險模擬模組",
    "一個 Streamlit AI 智能投資網站",
  ];

  return (
    <section id="final" className="section final-section">
      <div className="final-card">
        <div className="final-text">
          <div className="final-badge">
            <Trophy size={16} />
            Final Project
          </div>
          <h2>你的最終成果</h2>
          <p>
            完成全部任務後，使用者會從零散的 Prompt 與 Python
            練習，逐步整合成一套可展示、可講解、可延伸的 AI 智能投資教學平台。
          </p>
        </div>

        <div className="outcome-grid">
          {outcomes.map((item, index) => (
            <div className="outcome-card" key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>

        <div className="teaching-note">
          <Gauge size={20} />
          <p>
            可讓使用者先從 Mission 1 與 Mission 2 完成最小可行成果，再逐步加入
            AI 報告、投資組合與風險模擬。最後用 Streamlit 整合為一個完整 Demo。
          </p>
        </div>
      </div>
    </section>
  );
}

function RiskStatement() {
  return (
    <footer className="footer">
      <div className="footer-card">
        <AlertTriangle size={26} />
        <div>
          <h3>風險聲明</h3>
          <p>
            本網站所產生之圖表、數據與 AI
            分析內容，僅供研究、資訊展示與金融科技實作參考，不構成任何投資建議、買賣建議或報酬保證。
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeMission, setActiveMission] = useState("m1");

  return (
    <main>
      <Navbar />
      <Hero />
      <ConceptCards />
      <MissionMap
        activeMission={activeMission}
        setActiveMission={setActiveMission}
      />
      <MissionDetails
        activeMission={activeMission}
        setActiveMission={setActiveMission}
      />
      <Quiz />
      <FinalProject />
      <RiskStatement />
    </main>
  );
}
