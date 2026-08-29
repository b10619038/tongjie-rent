const KEY = "tongjie_rent_app_v8";
const LINE_OA_URL = "https://lin.ee/QMWEJ6KI";
const LINE_OA_ID = "@773zynao";
const LINE_CHAT_URL = "https://chat.line.biz/";
const LINE_HOOK = "https://tongjie-line.b10619038.workers.dev";
const DATA_API = LINE_HOOK + "/api/state";
const SYNC_KEY = "tj-82934388";
const UI_KEY = "tongjie_ui_v2";
const TAB_KEY = "tongjie_tab_order";
const ADMIN_CODES = ["1976", "7651", "1240"];
const BOOK_ACCOUNTS = ["統潔", "信潔", "聯名戶", "個人戶", "現金(保險箱)"];
const REPORT_ACCOUNTS = ["統潔", "信潔", "個人戶", "現金(保險箱)"];
const ACCOUNT_BANKS = { "統潔": ["聯邦", "農會", "兆豐", "超商"], "信潔": ["聯邦", "超商"] };
const BANK_PLACES = ["聯邦", "兆豐", "農會", "超商"];
const PERSONAL_PEOPLE = ["趙文榮", "趙洪漳", "趙浩鈞", "趙文彬", "趙苡真", "趙海成、趙正賢", "江秀霞", "黃思敏"];
const PERSONAL_ACCOUNTS = PERSONAL_PEOPLE.map(p => "個人戶·" + p);
const APP_VERSION = "2026-08-30-上午12:28";
const TENANT_ROSTER_VER = "20260829-2230";
const FACTORY_ROSTER_VER = "20260828-2030";
const CHANGELOG = [
  { ver: "2026-08-30-上午12:28", items: ["工作助手圖塊改為提問工作助手"] },
  { ver: "2026-08-29-下午11:43", items: ["總覽移除本月收租率"] },
  { ver: "2026-08-29-下午10:36", items: ["修復畫面全白"] },
  { ver: "2026-08-29-下午10:33", items: ["修復管理員密碼無法登入"] },
  { ver: "2026-08-29-下午10:30", items: ["所有資產編輯欄位可正常填寫"] },
  { ver: "2026-08-29-下午10:28", items: ["總覽新增太陽能覆蓋率圓餅圖"] },
  { ver: "2026-08-29-下午10:25", items: ["套房出租率圖塊加上廠房與店面出租率，並新增6811、7011、7211店面"] },
  { ver: "2026-08-29-下午10:13", items: ["統潔分聯邦農會兆豐、信潔分聯邦，進出帳明細會顯示銀行"] },
  { ver: "2026-08-29-下午9:54", items: ["本月進出帳可搜尋帳戶備註金額並配合日期"] },
  { ver: "2026-08-29-下午9:51", items: ["點統潔信潔個人戶現金圖卡，進出帳只顯示該戶"] },
  { ver: "2026-08-29-下午9:28", items: ["手機後台總覽圓餅圖與邊距不再卡住"] },
  { ver: "2026-08-29-下午9:20", items: ["本月進出帳可拉選日期區間查看紀錄"] },
  { ver: "2026-08-29-下午9:12", items: ["本月進出帳匯出列印改到右上"] },
  { ver: "2026-08-29-下午9:11", items: ["銀行入帳與銀行業務合併為跑銀行上傳入帳"] },
  { ver: "2026-08-29-下午9:07", items: ["本月進出帳左上新增匯出與列印"] },
  { ver: "2026-08-29-下午9:06", items: ["內容四個按鈕左邊加上小圖"] },
  { ver: "2026-08-29-下午9:02", items: ["修復總覽新增一筆無法輸入與記入"] },
  { ver: "2026-08-29-下午9:01", items: ["整體報表移除個人戶明細表"] },
  { ver: "2026-08-29-下午8:53", items: ["內容按鈕改為左上繳費租金、右上綁定 LINE、左下房間資訊"] },
  { ver: "2026-08-29-下午8:44", items: ["後台頂部分頁改回原本樣式，不再放大跳動"] },
  { ver: "2026-08-29-下午8:42", items: ["修復立即更新按鈕沒有反應"] },
  { ver: "2026-08-29-下午8:41", items: ["更新視窗標題改為這次更新內容如下"] },
  { ver: "2026-08-29-下午8:40", items: ["修復點更新列沒有跳出更新內容"] },
  { ver: "2026-08-29-下午8:38b", items: ["後台頂部分頁綠色底塊跟著文字一起放大"] },
  { ver: "2026-08-29-下午8:38", items: ["收合橫條移除點擊展開文字"] },
  { ver: "2026-08-29-下午8:37", items: ["內容四個按鈕改回兩兩一排"] },
  { ver: "2026-08-29-下午8:36", items: ["點本月未繳可進入繳費租金"] },
  { ver: "2026-08-29-下午8:33", items: ["後台頂部分頁改為不重畫底條，滑動更順"] },
  { ver: "2026-08-29-下午8:30", items: ["後台頂部分頁滑順移動，點擊後文字放大"] },
  { ver: "2026-08-29-下午8:26", items: ["開發者預覽問候改為您好，開發者"] },
  { ver: "2026-08-29-下午8:24", items: ["問候白底塊取消黑邊"] },
  { ver: "2026-08-29-下午8:22", items: ["上傳照片與影片合併成一個按鈕"] },
  { ver: "2026-08-29-下午8:21", items: ["問候列改為白色底塊，與公告一起從左滑入"] },
  { ver: "2026-08-29-下午8:17", items: ["底部分頁圖示點擊時再放大"] },
  { ver: "2026-08-29-下午8:15", items: ["底部分頁縮放再加大一點"] },
  { ver: "2026-08-29-下午8:14", items: ["繳費租金與綁定 LINE 改回不跳動"] },
  { ver: "2026-08-29-下午8:11", items: ["未繳費三天前與未綁 LINE 的按鈕會跳動提醒"] },
  { ver: "2026-08-29-下午8:08", items: ["尚未簽約按鈕滑入定位後邊邊跳動"] },
  { ver: "2026-08-29-下午8:02", items: ["修復線上簽名筆畫會自動消失"] },
  { ver: "2026-08-29-下午7:59", items: ["修復首頁公告與房間圖塊滑入被重畫關掉的問題"] },
  { ver: "2026-08-29-下午7:58", items: ["房間圖塊改為由右到左整張滑入"] },
  { ver: "2026-08-29-下午7:57", items: ["公告圖塊改為由左到右整張滑入"] },
  { ver: "2026-08-29-下午7:15", items: ["底部分頁縮放改慢、更滑順"] },
  { ver: "2026-08-29-下午6:54", items: ["點首頁時房間圖塊從右邊滑入"] },
  { ver: "2026-08-29-下午6:52", items: ["天氣動態不因點擊畫面而重來"] },
  { ver: "2026-08-29-下午6:50", items: ["點首頁時公告圖塊從左邊滑入"] },
  { ver: "2026-08-29-下午6:47", items: ["底部分頁點擊時圖示也會立刻放大"] },
  { ver: "2026-08-29-下午6:44", items: ["底部分頁點下去立刻放大，不再延遲"] },
  { ver: "2026-08-29-下午6:42", items: ["底部分頁選中改為橢圓，點擊會放大"] },
  { ver: "2026-08-29-下午6:38", items: ["租客底部分頁改為滑順移動，到位後有縮放"] },
  { ver: "2026-08-29-下午6:37", items: ["租客切換頁面恢復左右滑入，報修標題靠左"] },
  { ver: "2026-08-29-下午6:30", items: ["天氣特效改為只留動態圖，不再換背景色"] },
  { ver: "2026-08-29-下午6:26", items: ["天氣背景改為動態特效：太陽、飄雲、落雨、閃電"] },
  { ver: "2026-08-29-下午6:19", items: ["租客問候區依鳳山即時天氣顯示晴天／陰天／雨天／大雷雨"] },
  { ver: "2026-08-29-下午6:07", items: ["銀行入帳與銀行業務改為吸收檔案文字記入帳本，不再留圖片"] },
  { ver: "2026-08-29-下午5:55", items: ["後台分頁點擊時白色底塊改為滑順移動"] },
  { ver: "2026-08-29-下午5:51", items: ["工作助手上傳按鈕改為上傳檔案"] },
  { ver: "2026-08-29-下午5:36", items: ["公告紀錄編輯後按儲存會真正寫入並關閉編輯"] },
  { ver: "2026-08-29-下午5:32", items: ["公告紀錄可在該圖塊直接編輯刪除，發布欄只負責發新公告"] },
  { ver: "2026-08-29-下午5:27", items: ["上傳圖塊隱藏系統的選擇檔案文字"] },
  { ver: "2026-08-29-下午5:26", items: ["修復公告編輯：點編輯會打開發布欄並帶入內容"] },
  { ver: "2026-08-29-下午5:22", items: ["發布公告標題恢復，並修正點其他地方會跳到此欄"] },
  { ver: "2026-08-29-下午5:18", items: ["修復畫面全白"] },
  { ver: "2026-08-29-下午5:14", items: ["公告編輯按鈕改為捲到上方表單，並加大點擊區"] },
  { ver: "2026-08-29-下午5:13", items: ["套房分組房間首頁圖統一換成白色套房模型"] },
  { ver: "2026-08-29-下午5:10", items: ["公告編輯與使用規範恢復可點擊填寫"] },
  { ver: "2026-08-29-下午5:08", items: ["套房改為和廠房一樣的綠色分組收合"] },
  { ver: "2026-08-29-下午5:07", items: ["公告改為頭貼旁顯示管理員與時間，標題在下一行"] },
  { ver: "2026-08-29-下午4:51", items: ["工作助手拖移點改為隱形，仍可從右上角拖排"] },
  { ver: "2026-08-29-下午4:50", items: ["工作助手拖移點改為單點"] },
  { ver: "2026-08-29-下午4:49", items: ["廠房分組全開全關合併為一個切換鈕"] },
  { ver: "2026-08-29-下午4:47", items: ["工作助手圖塊改為右上角拖移點才能拖排"] },
  { ver: "2026-08-29-下午4:44", items: ["拖移工作助手圖塊時維持圓角"] },
  { ver: "2026-08-29-下午4:39", items: ["工作助手圖塊可上下拖移排序"] },
  { ver: "2026-08-29-下午4:38", items: ["工作助手改為橫條收起，點擊展開"] },
  { ver: "2026-08-29-下午4:35", items: ["手機頂部狀態列顏色會跟著主題改變"] },
  { ver: "2026-08-29-下午4:30", items: ["上傳銀行入帳資料可填寫，並改為橫條展開"] },
  { ver: "2026-08-29-下午4:27", items: ["記下銀行業務改為橫條收起，點擊展開"] },
  { ver: "2026-08-29-下午4:19", items: ["發布公告改為橫條收起，點擊展開"] },
  { ver: "2026-08-29-下午3:32", items: ["記下銀行業務欄位改為可點擊填寫"] },
  { ver: "2026-08-29-下午3:28", items: ["記下銀行業務欄位可點擊填寫"] },
  { ver: "2026-08-29-下午3:24", items: ["記下銀行業務可正常填寫並登錄"] },
  { ver: "2026-08-29-下午2:55", items: ["開發者公告改用男客服頭貼"] },
  { ver: "2026-08-29-下午2:51", items: ["管理員公告頭貼改為客服照片"] },
  { ver: "2026-08-29-下午2:44", items: ["套房／廠房與租客切換改為與年月相同的白塊滑動"] },
  { ver: "2026-08-29-下午2:40", items: ["整體報表切換改為年在左、月在右"] },
  { ver: "2026-08-29-下午2:29", items: ["電腦可用滑鼠框選文字複製，框選不會卡住"] },
  { ver: "2026-08-29-下午2:28", items: ["套房／廠房與租客切換圖塊點擊有縮放回彈"] },
  { ver: "2026-08-29-下午1:06", items: ["套房／廠房與租客白塊改為滑過去，不再瞬間跳亮"] },
  { ver: "2026-08-29-中午12:46", items: ["套房／廠房與租客切換白塊改為點哪裡滑到哪裡"] },
  { ver: "2026-08-29-中午12:42", items: ["套房／廠房與租客切換白塊改為與月／年相同滑動"] },
  { ver: "2026-08-29-中午12:40", items: ["手機從頂部下拉可重新整理畫面"] },
  { ver: "2026-08-29-中午12:39", items: ["套房／廠房與租客左右切換改為與月／年相同滑順"] },
  { ver: "2026-08-29-中午12:36", items: ["電子合約同意勾選可點，畫面文字可框選複製"] },
  { ver: "2026-08-29-中午12:31", items: ["套房／廠房與租客左右切換改為滑順"] },
  { ver: "2026-08-29-中午12:26", items: ["修復畫面全白"] },
  { ver: "2026-08-29-中午12:24", items: ["套房租客圖卡往左小滑才開 LINE，綠色區塊縮小"] },
  { ver: "2026-08-29-中午12:22", items: ["點擊畫面維持原位置，不會跳回頂部"] },
  { ver: "2026-08-29-中午12:20", items: ["點擊畫面不再整頁跳動"] },
  { ver: "2026-08-29-中午12:18", items: ["套房設備新增飲水機"] },
  { ver: "2026-08-29-中午12:14", items: ["報修描述欄改為獨立輸入框，手機電腦都可打字"] },
  { ver: "2026-08-29-中午12:09", items: ["租客可線上簽署電子合約", "租客畫面靜止區塊不再跳動"] },
  { ver: "2026-08-29-中午12:04", items: ["報修描述欄可穩定輸入，不再整頁跳動"] },
  { ver: "2026-08-29-中午12:02", items: ["極黑主題下我的房間圖卡改為深底清楚字"] },
  { ver: "2026-08-29-上午11:59", items: ["報修選項與提交不再整頁滑動，描述欄可正常輸入"] },
  { ver: "2026-08-29-上午11:54", items: ["極黑主題修正底部選單與報修選項對比"] },
  { ver: "2026-08-29-凌晨3:23", items: ["套房資產四棟封面統一為白模套房照"] },
  { ver: "2026-08-29-凌晨3:19", items: ["陽台、停車位、子母車詳情改為白模實景影片"] },
  { ver: "2026-08-29-凌晨3:16", items: ["房間詳情改為白模實景影片"] },
  { ver: "2026-08-29-凌晨3:12", items: ["房間、陽台、車位、子母車圖塊換成新白模照片"] },
  { ver: "2026-08-29-凌晨2:41", items: ["廠房資產首頁照片統一換成白模廠區"] },
  { ver: "2026-08-29-凌晨2:34", items: ["已移除後台透天模型預覽"] },
  { ver: "2026-08-29-凌晨2:32", items: ["後台首頁可預覽五層四戶透天模型照片"] },
  { ver: "2026-08-29-凌晨2:18", items: ["套房設備新增床鋪、電梯"] },
  { ver: "2026-08-29-凌晨2:16", items: ["租客首頁恢復設備、水電、Wifi；DEMO 房間可模擬完整內容"] },
  { ver: "2026-08-29-凌晨2:14", items: ["租客繳費狀態已移除匯入資料（開發者預覽與所有租客）"] },
  { ver: "2026-08-29-凌晨2:10", items: ["收租率與出租率圓餅改玫瑰與金黃"] },
  { ver: "2026-08-29-凌晨2:08", items: ["滑動排表時不會再切到其他頁"] },
  { ver: "2026-08-29-凌晨2:05", items: ["點擊營收排表可放大，手機橫放可雙指縮放"] },
  { ver: "2026-08-29-凌晨2:02", items: ["收租率與出租率圓餅改清爽配色"] },
  { ver: "2026-08-29-凌晨2:00", items: ["整體報表兩張排表改為圓角圖塊"] },
  { ver: "2026-08-29-凌晨1:58", items: ["整體報表改為匯出、列印，放在月年右側"] },
  { ver: "2026-08-29-凌晨1:55", items: ["整體報表匯出／列印改為當月、當年、四戶與總餘額排表"] },
  { ver: "2026-08-29-凌晨1:50", items: ["營收總額圓餅改為較清爽的配色"] },
  { ver: "2026-08-29-凌晨1:42", items: ["修復進入後空白"] },
  { ver: "2026-08-29-凌晨1:40", items: ["套入115年7月進出帳與期初餘額（現金、統潔、信潔、個人戶）"] },
  { ver: "2026-08-29-凌晨1:35", items: ["修復安裝版與電腦進入後空白"] },
  { ver: "2026-08-29-凌晨1:30", items: ["還原先前套入的租客名單", "租客首頁繳費狀態可匯入轉帳資料"] },
  { ver: "2026-08-29-凌晨1:25", items: ["7051、7251 改空房", "套房租客可匯入收款明細"] },
  { ver: "2026-08-29-凌晨1:20", items: ["套入牛10　115年8月收款明細：租金、承租人、已繳日期"] },
  { ver: "2026-08-29-凌晨1:15", items: ["安裝後引導開啟手機／電腦系統通知（Android 與 iOS）"] },
  { ver: "2026-08-29-凌晨1:10", items: ["安裝版才發系統通知：公告、繳費、到期、報修、續約"] },
  { ver: "2026-08-29-凌晨1:05", items: ["套房租客圖卡顯示租金，在線狀態改為綠／紅圓點"] },
  { ver: "2026-08-29-凌晨1:00", items: ["廠房資產首頁改為白色建模照片"] },
  { ver: "2026-08-29-凌晨12:55", items: ["移除我的房間圖卡滑入模型"] },
  { ver: "2026-08-29-凌晨12:50", items: ["租客登入欄位改為建立密碼"] },
  { ver: "2026-08-29-凌晨12:45", items: ["我的房間模型完整顯示在卡片內，不再卡住邊"] },
  { ver: "2026-08-29-凌晨12:40", items: ["我的房間圖卡固定淺灰，不受調色盤影響"] },
  { ver: "2026-08-29-凌晨12:35", items: ["我的房間模型再往左，避免手機擋住"] },
  { ver: "2026-08-29-凌晨12:30", items: ["我的房間圖塊右側滑入套房模型"] },
  { ver: "2026-08-29-凌晨12:25", items: ["子母車改為單桶與提垃圾人像", "套房詳情新增基本使用規範"] },
  { ver: "2026-08-29-凌晨12:20", items: ["套房與公共陽台照片改為白色簡約建模風格"] },
  { ver: "2026-08-29-凌晨12:15", items: ["房間新增子母車（垃圾桶）與使用規範"] },
  { ver: "2026-08-29-凌晨12:10", items: ["房間停車位改為白色簡約建模照片"] },
  { ver: "2026-08-28-晚上11:55", items: ["租客內容新增周邊景點，可看地圖並導航"] },
  { ver: "2026-08-28-晚上11:35", items: ["廠房租客可收合，同公司多房合併", "廠房搜尋改為人名、公司名、牛案場"] },
  { ver: "2026-08-28-晚上11:25", items: ["租客列表可搜尋房號、姓名、電話"] },
  { ver: "2026-08-28-晚上11:20", onlyDev: true, items: ["開發者後台登出／租客改回分開的兩顆圖塊"] },
  { ver: "2026-08-28-晚上11:15", items: ["套房租客圖卡預設收成姓名列，點一下展開"] },
  { ver: "2026-08-28-晚上11:05", onlyDev: true, items: ["開發者後台登出／租客合併為可左右滑動的圖塊"] },
  { ver: "2026-08-28-晚上11:00", items: ["公告署名改為管理員或開發者，不再顯示客服"] },
  { ver: "2026-08-28-晚上10:55", items: ["管理員後台「切換身分」改為登出"] },
  { ver: "2026-08-28-晚上10:50", onlyDev: true, items: ["開發者後台改為登出／租客預覽，預覽不計入金額"] },
  { ver: "2026-08-28-晚上10:40", items: ["租客未上傳大頭貼時改為白色人像", "公告旁加上客服頭像"] },
  { ver: "2026-08-28-晚上10:30", items: ["日誌可看租客／管理員／開發者是否在線", "修復電腦與手機底部更新通知圖塊"] },
  { ver: "2026-08-28-晚上10:20", items: ["手機點個人戶下拉選成員後，會進入該人的營收總額"] },
  { ver: "2026-08-28-晚上10:00", items: ["整體報表個人戶圖卡改與其他帳戶同大小，下拉改為請下拉選擇", "日誌地址改為台灣縣市＋區", "套房租客在線狀態改到姓名右側"] },
  { ver: "2026-08-28-晚上9:40", items: ["整體報表個人戶可下拉八位成員", "套房租客圖卡顯示在線中／離線中", "日誌會記下管理員操作時的地址與手機型號", "修正畫面每隔幾秒自動跳一下"] },
  { ver: "2026-08-28-晚上8:55", items: ["整體報表個人戶納入八位成員", "新增一筆帳戶的個人戶可選趙文榮等八位"] },
  { ver: "2026-08-28-下午6:55", items: ["套入套房租客正確姓名、電話、合約期間與帳戶後五碼"] },
  { ver: "2026-08-28-下午4:16", items: ["廠房分組收合改為子項目往上滑收"] },
  { ver: "2026-08-28-下午4:12", items: ["套房租客／廠房租客切換改為與所有資產相同的順滑移動"] },
  { ver: "2026-08-28-下午4:08", items: ["租客可上傳大頭貼，廠房分組可收合並支援全開全關"] },
  { ver: "2026-08-28-下午4:00", items: ["廠房租客預留 40 個空白名額"] },
  { ver: "2026-08-28-下午3:50", items: ["租客分為套房租客與廠房租客，現有房號都在套房"] },
  { ver: "2026-08-28-下午3:46", items: ["銀行入帳與銀行業務有金流會記入進出帳與報表，並自動去掉重複"] },
  { ver: "2026-08-28-下午3:40", items: ["新增一筆可上傳 Excel，工作助手自動記入進出帳與整體報表"] },
  { ver: "2026-08-28-下午3:06", items: ["租客登入需設定密碼，後台可查看，忘記密碼可找回"] },
  { ver: "2026-08-28-下午2:54", items: ["修正手機打開 App 卡在白畫面"] },
  { ver: "2026-08-28-下午2:48", items: ["整體報表年月切換改為順滑滑動", "本月進出帳已清空 8/28 自動帶入的紀錄"] },
  { ver: "2026-08-28-下午2:37", items: ["總覽圓餅改為整體報表的營收總額與本期收支"] },
  { ver: "2026-08-28-下午2:34", items: ["後台分類列可左右滑動，內容區也可滑動切換分類"] },
  { ver: "2026-08-28-下午2:32", items: ["匯出 Excel 含期間年月與總餘額"] },
  { ver: "2026-08-28-下午2:28", items: ["累計餘額改為營收總額", "整體報表年月合併為可左右滑動切換"] },
  { ver: "2026-08-28-下午2:24", items: ["後台分類改為手機可長按拖移，並跟著手指滑動"] },
  { ver: "2026-08-28-下午2:20", items: ["後台分類可長按左右拖移排序"] },
  { ver: "2026-08-28-下午2:18", onlyDev: true, items: ["操作日誌新增開發者分類，1240 會歸在開發者"] },
  { ver: "2026-08-28-下午2:16", items: ["AI助手更名為工作助手"] },
  { ver: "2026-08-28-下午2:15", items: ["整體報表累計餘額可點進去編輯", "已移除四戶本期淨額"] },
  { ver: "2026-08-28-下午2:05", items: ["我的房間圖卡改回原本淺綠色，不隨主題變色"] },
  { ver: "2026-08-28-下午2:03", items: ["後台可編輯租客繳費時間與繳費回報", "6821 官方 LINE 繳費回報已歸零"] },
  { ver: "2026-08-28-下午1:55", items: ["我的房間圖卡會隨主題變色，剩餘天數與本月租金維持白底"] },
  { ver: "2026-08-28-下午1:53", items: ["整體報表標題與說明改為獨立一排，不再被按鈕擠掉"] },
  { ver: "2026-08-28-下午1:50", items: ["主題新增極白、極黑"] },
  { ver: "2026-08-28-下午1:48", items: ["租客「我的房間」圖卡會跟著主題色調一起變化"] },
  { ver: "2026-08-28-下午1:44", items: ["總餘額測試進帳 10,000 已歸零"] },
  { ver: "2026-08-28-下午1:34", items: ["整體報表改為統潔、信潔、個人戶、現金（保險箱）四戶歷史營收，可查月／年並顯示總餘額"] },
  { ver: "2026-08-28-下午1:26", items: ["新增一筆：進帳綠色、出帳紅色"] },
  { ver: "2026-08-28-下午1:24", items: ["信潔與統潔收支圓餅圖改為同一組顏色"] },
  { ver: "2026-08-28-下午1:22", items: ["新增一筆帳戶改為統潔、信潔、聯名戶、個人戶、現金（保險箱）"] },
  { ver: "2026-08-28-下午1:16", items: ["總覽新增一筆已移除房號欄，說明改為備註", "整體報表可列印"] },
  { ver: "2026-08-28-上午11:56", items: ["畫面正下方改為「資料經 HTTPS 同步雲端」與版本號同一行"] },
  { ver: "2026-08-28-上午11:24", onlyDev: true, items: ["日誌紀錄可單筆刪除、全選刪除", "開發者專用更新內容，一般管理員與租客看不到"] },
  { ver: "2026-08-28-上午11:10", items: ["記下銀行業務可上傳會計紙本照片"] },
  { ver: "2026-08-28-上午11:08", onlyDev: true, items: ["開發者後台新增「日誌」，可看租客／管理員何時用哪台裝置登入、操作與瀏覽"] },
  { ver: "2026-08-28-上午2:10", items: ["租客與管理員關閉 App 或重新整理後仍保持登入", "只有點「登出」或「切換身分」才會回到登入首頁"] },
  { ver: "2026-08-28-上午2:00", items: ["點擊下方更新通知，可查看這次更新了哪些內容", "看完後可選擇立即更新或稍後"] },
  { ver: "2026-08-28-上午1:55", items: ["公告、報修、續約、合約到期、未繳租金會在手機上方跳出系統通知", "管理員也會收到新報修、續約申請與繳費回報"] },
  { ver: "2026-08-28-上午1:43", items: ["修復「下載安裝電腦版」點了沒反應", "改為跳出安裝說明，Chrome／Edge 可一鍵安裝"] },
  { ver: "2026-08-28-上午1:40", items: ["管理員密碼下方新增「下載 App」", "支援 Android 與 iPhone／iPad 加入主畫面"] },
  { ver: "2026-08-28-上午1:36", items: ["管理員登入頁新增電腦版下載安裝"] },
  { ver: "2026-08-28-上午1:33", items: ["電腦版安裝圖標改為圓角"] },
  { ver: "2026-08-28-上午1:28", items: ["管理員公告改為連點兩下按愛心，讚與笑臉已移除"] }
];
const THEME_KEY = "tongjie_theme";
const THEMES = [
  { id: "sage", name: "原木綠", teal: "#62765b", mid: "#738a6c", soft: "#e6ede3", chip: "#f7f0e8", ink: "#17211f" },
  { id: "navy", name: "海霧藍", teal: "#3d5a80", mid: "#4f6f99", soft: "#e4edf6", chip: "#eef3f8", ink: "#1b2838" },
  { id: "sky", name: "青空", teal: "#4a7c9b", mid: "#5b90b0", soft: "#e3f0f6", chip: "#eef6fa", ink: "#173040" },
  { id: "moss", name: "松針", teal: "#3f6b58", mid: "#52856d", soft: "#e3efe8", chip: "#eef5f0", ink: "#163028" },
  { id: "tea", name: "暖茶", teal: "#8a6a4f", mid: "#a07d5e", soft: "#f3ebe3", chip: "#f7f0e8", ink: "#2a1f16" },
  { id: "sand", name: "沙金", teal: "#b08948", mid: "#c49a55", soft: "#f6eedc", chip: "#f8f1e0", ink: "#2c2414" },
  { id: "clay", name: "赤陶", teal: "#b5694f", mid: "#c47b62", soft: "#f6e6df", chip: "#f8eee9", ink: "#2e1b14" },
  { id: "rose", name: "豆沙", teal: "#a65d63", mid: "#b87076", soft: "#f6e6e8", chip: "#f8eef0", ink: "#2c1719" },
  { id: "dusk", name: "暮紫", teal: "#6b5b73", mid: "#7e6d86", soft: "#eee8f1", chip: "#f4eef6", ink: "#241c28" },
  { id: "slate", name: "岩灰", teal: "#5c6568", mid: "#6e787c", soft: "#e8ecec", chip: "#f0f2f2", ink: "#1c2224" },
  { id: "ink", name: "墨黑", teal: "#2f3330", mid: "#454a46", soft: "#e6e7e6", chip: "#f0f0ef", ink: "#141615" },
  { id: "wine", name: "酒紅", teal: "#7a3e48", mid: "#8f515b", soft: "#f3e4e6", chip: "#f7eef0", ink: "#2a1518" },
  { id: "snow", name: "極白", teal: "#111111", mid: "#2a2a2a", soft: "#f2f2f2", chip: "#f7f7f7", ink: "#111111", paper: "#ffffff", card: "#ffffff", line: "#e6e6e6", muted: "#8a8a8a", inkSoft: "#4a4a4a", onTeal: "#ffffff", bar: "#ffffff" },
  { id: "void", name: "極黑", teal: "#f0f0f0", mid: "#d6d6d6", soft: "#161616", chip: "#1c1c1c", ink: "#f5f5f5", paper: "#000000", card: "#111111", line: "#2c2c2c", muted: "#8d8d8d", inkSoft: "#c8c8c8", onTeal: "#111111", bar: "#000000" }
];
function currentThemeId() {
  try { return localStorage.getItem(THEME_KEY) || "sage"; } catch { return "sage"; }
}
function applyTheme(id) {
  const t = THEMES.find(x => x.id === id) || THEMES[0];
  const r = document.documentElement;
  const bar = t.bar || t.teal;
  r.style.setProperty("--teal", t.teal);
  r.style.setProperty("--teal-mid", t.mid);
  r.style.setProperty("--ok", t.teal);
  r.style.setProperty("--ok-soft", t.soft);
  r.style.setProperty("--mint", t.soft);
  r.style.setProperty("--chip", t.chip);
  r.style.setProperty("--ink", t.ink);
  r.style.setProperty("--ink-soft", t.inkSoft || "#4b5b57");
  r.style.setProperty("--muted", t.muted || "#7a8a85");
  r.style.setProperty("--line", t.line || "#e4ebe8");
  r.style.setProperty("--paper", t.paper || "#ffffff");
  r.style.setProperty("--card", t.card || "#ffffff");
  r.style.setProperty("--on-teal", t.onTeal || "#ffffff");
  r.style.setProperty("--bar", bar);
  r.style.setProperty("--mask", t.bar === "#000000" ? "rgba(0,0,0,.58)" : "rgba(255,255,255,.72)");
  const dark = t.id === "void" || t.paper === "#000000";
  r.style.setProperty("--press", dark ? "#262626" : "#f3f3f3");
  r.style.setProperty("--press-on", dark ? "#3a3a3a" : "#d8e2d4");
  try { if (r.dataset) r.dataset.theme = t.id; } catch {}
  r.style.backgroundColor = bar;
  if (document.body) document.body.style.backgroundColor = bar;
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove());
  const meta = document.createElement("meta");
  meta.setAttribute("name", "theme-color");
  meta.setAttribute("content", bar);
  document.head.appendChild(meta);
  const apple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (apple) apple.setAttribute("content", dark ? "black" : t.id === "snow" ? "default" : "black-translucent");
  try { localStorage.setItem(THEME_KEY, t.id); } catch {}
}
function showThemeFab() {
  return true;
}
function themePickerHtml() {
  if (!showThemeFab()) return "";
  const lift = ui.role === "tenant" ? " lift" : "";
  const cur = currentThemeId();
  const panel = ui.themeOpen ? `<div class="theme-mask" id="theme-mask">
    <div class="theme-panel">
      <div class="label">整體風格</div>
      <h2>選擇色調</h2>
      <div class="theme-grid">
        ${THEMES.map(t => `<button type="button" class="theme-swatch ${cur === t.id ? "on" : ""}" data-theme="${t.id}" style="--sw:${t.teal};--sw2:${t.soft}">
          <i></i><span>${t.name}</span>
        </button>`).join("")}
      </div>
      <button type="button" class="ghost" id="theme-close">關閉</button>
    </div>
  </div>` : "";
  return `${panel}<button type="button" class="theme-fab${lift}" id="theme-open" aria-label="主題色調">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/></svg>
  </button>`;
}
function bindThemePicker() {
  const open = document.getElementById("theme-open");
  if (open) open.onclick = e => { e.stopPropagation(); ui.themeOpen = !ui.themeOpen; render(); };
  const close = document.getElementById("theme-close");
  if (close) close.onclick = () => { ui.themeOpen = false; render(); };
  const mask = document.getElementById("theme-mask");
  if (mask) mask.onclick = e => { if (e.target.id === "theme-mask") { ui.themeOpen = false; render(); } };
  document.querySelectorAll("[data-theme]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      applyTheme(btn.dataset.theme);
      render();
    };
  });
}
const VAPID_PUBLIC = "BBLxqQE_pC44KpT3eLZJCPvDhN4yrRkOBTkBhCpqHMsu2R05TcESfM5AN3PKUGTdGf1ED4Ae90EDfaAm2vo658M";
window.__swReg = null;
let deferredInstall = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredInstall = e;
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(r => {
    window.__swReg = r;
    if (r.waiting && !navigator.serviceWorker.controller) r.waiting.postMessage("SKIP_WAITING");
    watchAppUpdate(r);
    return navigator.serviceWorker.ready;
  }).then(r => { window.__swReg = r; }).catch(() => {});
  navigator.serviceWorker.addEventListener("message", e => {
    if (e.data && e.data.type === "SHOW_CHANGELOG") {
      ui.updateReady = true;
      ui.updateNotes = true;
      try { render(); } catch {}
    }
  });
}
function isPhone() {
  return isIOS() || isAndroid() || /mobile|iphone|android/i.test(navigator.userAgent || "");
}
function isDeveloper() { return ui.role === "admin" && ui.adminCode === "1240"; }
function lastSeenVersion() {
  try { return localStorage.getItem("tj-last-ver") || ""; } catch { return ""; }
}
function seedSeenVersion() {
  if (lastSeenVersion()) return;
  try { localStorage.setItem("tj-last-ver", APP_VERSION); } catch {}
}
function hasUnseenUpdate() {
  const last = lastSeenVersion();
  if (!last) return false;
  return last !== APP_VERSION;
}
function unseenChangelog() {
  const last = lastSeenVersion();
  if (last === APP_VERSION) return [];
  const idx = CHANGELOG.findIndex(x => x.ver === last);
  const raw = idx < 0 ? CHANGELOG.slice(0, 4) : CHANGELOG.slice(0, idx);
  const dev = isDeveloper();
  return raw.map(n => {
    if (n.onlyDev && !dev) return null;
    const items = (n.items || []).slice();
    if (dev && n.devItems) items.push(...n.devItems);
    return items.length ? { ver: n.ver, items } : null;
  }).filter(Boolean);
}
function changelogSheetHtml() {
  if (!ui.updateNotes) return "";
  const notes = unseenChangelog();
  const blocks = notes.map(n => `<div class="log-ver"><strong>${escapeHtml(n.ver)}</strong><ul>${n.items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>`).join("");
  return `<div class="install-mask" id="update-mask">
    <div class="install-sheet">
      <div class="label">軟體更新</div>
      <h2>這次更新內容如下:</h2>
      <div class="log-list">${blocks || `<p class="small">版本 ${escapeHtml(APP_VERSION)}</p>`}</div>
      <button class="btn-navy" id="apply-update-now" type="button">立即更新</button>
      <button class="ghost" id="update-close" type="button">稍後</button>
    </div>
  </div>`;
}
function personPickSheetHtml() {
  if (!ui.personPick) return "";
  const b = reportBounds();
  return `<div class="install-mask" id="person-pick-mask">
    <div class="install-sheet">
      <div class="label">個人戶</div>
      <h2>選擇成員</h2>
      <div class="pick-list">
        ${PERSONAL_PEOPLE.map(p => {
          const ps = accountStats(personalKey(p), b.start, b.end);
          return `<button type="button" class="pick-item" data-pick-person="${escapeHtml(personalKey(p))}"><span>${escapeHtml(p)}</span><strong>${money(ps.bal)}</strong></button>`;
        }).join("")}
      </div>
      <button class="ghost" id="person-pick-cancel" type="button">取消</button>
    </div>
  </div>`;
}
function updateBarHtml() {
  if (!hasUnseenUpdate() && !ui.updateReady) return "";
  const lift = ui.role === "tenant" ? " lift" : "";
  return `<div class="home-upd${lift}" id="apply-update">有新版本 ${APP_VERSION}，點此查看更新內容</div>`;
}
function applyAppUpdate() {
  try { localStorage.setItem("tj-last-ver", APP_VERSION); } catch {}
  ui.updateNotes = false;
  ui.updateReady = false;
  try {
    const reg = window.__swReg;
    if (reg && reg.waiting) reg.waiting.postMessage("SKIP_WAITING");
  } catch {}
  location.reload();
}
function promptAppUpdate(reg) {
  if (ui.updateReady) return;
  ui.updateReady = true;
  try { render(); } catch {}
  if (canOsNotify()) {
    try {
      const n = new Notification("統潔開發有新版本", {
        body: "點通知可查看更新了哪些內容",
        tag: "tongjie-update",
        icon: "icon-192.png"
      });
      n.onclick = () => { window.focus(); ui.updateNotes = true; render(); n.close(); };
    } catch {}
    if (reg && reg.showNotification) {
      reg.showNotification("統潔開發有新版本", {
        body: "點通知可查看更新了哪些內容",
        tag: "tongjie-update",
        icon: "/icon-192.png"
      }).catch(() => {});
    }
  }
}
function watchAppUpdate(reg) {
  if (!reg) return;
  if (reg.waiting && navigator.serviceWorker.controller) promptAppUpdate(reg);
  reg.addEventListener("updatefound", () => {
    const sw = reg.installing;
    if (!sw) return;
    sw.addEventListener("statechange", () => {
      if (sw.state === "installed" && navigator.serviceWorker.controller) promptAppUpdate(reg);
    });
  });
  const check = () => { try { reg.update(); } catch {} };
  check();
  setInterval(check, 30 * 1000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") check(); });
}
let __reloading = false;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (__reloading) return;
    __reloading = true;
    location.reload();
  });
}
function urlBase64ToUint8Array(b64) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
function askTongjieNotify() {
  if (typeof Notification === "undefined" || typeof Notification.requestPermission !== "function") {
    alert(isIOS() ? "請先加入主畫面，再用桌面圖示打開 App" : "請用 Chrome 開啟這個網址");
    return;
  }
  const key = urlBase64ToUint8Array(VAPID_PUBLIC);
  if (window.__swReg && window.__swReg.pushManager) {
    window.__swReg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key }).catch(() => {});
  }
  const ret = Notification.requestPermission();
  const after = perm => {
    perm = perm || Notification.permission;
    if (perm === "granted") {
      subscribePushOnly();
      try { new Notification("統潔開發", { body: "通知已開啟", icon: "icon-192.png" }); } catch {}
      toast("通知已開啟");
    } else if (perm === "denied") {
      toast(isIOS() ? "請到設定 → 通知 → 統潔開發，打開允許" : "請到設定 → 應用程式 → 統潔開發 → 通知，改為允許");
    } else {
      toast("沒有跳出系統視窗。請用 Chrome 或 Safari，不要從 LINE 裡面開啟");
    }
    render();
  };
  if (ret && typeof ret.then === "function") ret.then(after, () => after("denied"));
}
window.askTongjieNotify = askTongjieNotify;
function versionFooter() {
  const cloud = ui.cloudOk === false ? "尚未連上雲端" : "資料經 HTTPS 同步雲端";
  return `<div class="ver">${cloud}　版本 ${APP_VERSION}</div>`;
}
function lineBindForRoom(no) {
  const v = ui.lineBinds && ui.lineBinds.byRoom && ui.lineBinds.byRoom[no];
  if (!v) return "";
  return typeof v === "string" ? v : (v.userId || "");
}
function lineBindName(no) {
  const v = ui.lineBinds && ui.lineBinds.byRoom && ui.lineBinds.byRoom[no];
  if (v && typeof v === "object") return v.name || "";
  return "";
}
async function refreshLineBinds() {
  try {
    const res = await fetch(LINE_HOOK + "/binds");
    ui.lineBinds = await res.json();
  } catch {
    ui.lineBinds = ui.lineBinds || { byRoom: {}, byUser: {} };
  }
}
function lineOaMessageUrl(text) {
  return "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_OA_ID) + "/?" + encodeURIComponent(text || "");
}
const DEFAULT_RULES = `1. 每月租金請於繳費日前完成，逾期將依合約處理。
2. 公共區域請保持安靜，晚上 9 點後避免大聲喧嘩。
3. 垃圾請分類並依規定時間放置，勿堆放在走廊或樓梯間。
4. 房間內禁止抽菸、開伙（簡易加熱除外）。
5. 冷氣、熱水器等設備請正常使用，損壞請從 App 報修，勿自行拆修。
6. 電費請至 5 樓自助儲值機刷卡儲值；水費為一年固定 $1,800。
7. 訪客請由承租人陪同，勿將房間轉租或借給他人長期居住。
8. 退租時請恢復原狀並交還鑰匙，押金於點交無誤後退還。`;
const TODAY = new Date("2026-08-26T00:00:00");
const STUDIO_NOS = [
  "6811", "6821", "6822", "6823", "6831", "6832", "6841", "6842",
  "7011", "7021", "7022", "7023", "7031", "7032", "7041", "7042", "7051",
  "7211", "7221", "7222", "7223", "7231", "7232", "7241", "7242", "7251",
  "7611", "7621", "7622", "7623", "7631", "7632", "7641", "7642"
];
const STORE_NOS = ["6811", "7011", "7211", "7611"];
function isStoreNo(no) { return STORE_NOS.includes(String(no)); }
const TENANT_INFO = {
  "6821": { name: "黃宥宇", phone: "0980-330-332" },
  "6822": { name: "吳孟書、黃莉晏", phone: "0938-513-126／0905-371-157", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "6823": { name: "顏家蓁", phone: "0972-103-874", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "6831": { name: "吳昱瑋" },
  "6832": { name: "周婕妤、許軒偉", phone: "0953-382-012／0913-901-017", leaseStart: "2025-09-01", leaseEnd: "2026-08-31" },
  "6841": { name: "劉冠德", phone: "0985-049-080", leaseStart: "2025-11-01", leaseEnd: "2026-10-31", bankLast5: "98847" },
  "6842": { name: "蘇冠達、吳汶修", phone: "0983-175-009／0980-968-882", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7021": { name: "陳信安", phone: "0966-268-087", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7022": { name: "郭雅萱", phone: "0979-030-393", leaseStart: "2025-11-01", leaseEnd: "2026-10-31", bankLast5: "80176" },
  "7023": { name: "謝雯鶯", phone: "0981-188-439", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7031": { name: "朱甫晟", phone: "0905-798-136", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7032": { name: "莊玉蓮", phone: "0970-803-244", leaseStart: "2025-10-01", leaseEnd: "2026-09-30" },
  "7041": { name: "劉恩彤", phone: "0901-106-209／0902-091-118", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7042": { name: "陳彥廷、賀芸儀", phone: "0972-986-430／0970-116-205", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7051": { name: "楊旻憲", phone: "0903-045-123", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7221": { name: "張智傑", phone: "0988-631-820", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7222": { name: "林呈澔、廖晉億", phone: "0911-800-717／0983-656-181", leaseStart: "2025-12-01", leaseEnd: "2026-11-30" },
  "7223": { name: "黃明媛、柯哲堯", phone: "0900-246-722／0988-881-915", leaseStart: "2025-10-01", leaseEnd: "2026-09-30", bankLast5: "57877" },
  "7231": { name: "林科承、朱宣羽", phone: "0968-887-012／0982-606-649", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7232": { name: "林紜亦", phone: "0981-248-775", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7241": { name: "陳逸仁", phone: "0972-118-118", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7242": { name: "陳智泓", phone: "0984-188-688", leaseStart: "2025-12-01", leaseEnd: "2026-11-30" },
  "7251": { name: "呂佳芸" },
  "7611": { name: "曾郁翔", phone: "0938-550-265", leaseStart: "2026-01-01", leaseEnd: "2031-12-31", shop: "波波奇" },
  "7621": { name: "王俊典、曾郁庭", phone: "0984-304-618／0986-555-065", leaseStart: "2026-01-01", leaseEnd: "2026-12-31" },
  "7622": { name: "邱育琳", phone: "0988-241-358", leaseStart: "2026-01-01", leaseEnd: "2026-12-31" },
  "7623": { name: "陳財源", phone: "0966-899-726", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7631": { name: "蔡文銘", phone: "0966-023-164", leaseStart: "2025-11-01", leaseEnd: "2026-10-31" },
  "7632": { name: "謝佩君", phone: "0931-299-938", leaseStart: "2025-10-01", leaseEnd: "2026-09-30", bankLast5: "12077" },
  "7641": { name: "張芷若", phone: "0902-350-637", leaseStart: "2025-12-01", leaseEnd: "2026-11-30" }
};
const TENANT_BY_ROOM = Object.fromEntries(Object.entries(TENANT_INFO).map(([k, v]) => [k, v.name]));
const STUDIO_BUILDINGS = [
  { prefix: "68", no: "牛10-68", street: "文龍東路68號", company: "統潔" },
  { prefix: "70", no: "牛10-70", street: "文龍東路70號", company: "統潔" },
  { prefix: "72", no: "牛10-72", street: "文龍東路72號", company: "統潔" },
  { prefix: "76", no: "牛10-76", street: "文龍東路76號", company: "統潔" }
];
function studioPrefix(no) {
  return String(no || "").replace(/\D/g, "").slice(0, 2);
}
const AMENITIES = ["冷氣", "冰箱", "洗衣機", "熱水器", "獨立衛浴", "網路", "書桌椅", "電視", "床鋪", "機車停車格", "電梯", "飲水機"];
const FACTORY_GROUPS = [
  { group: "牛1", street: "文龍東路", company: "信潔", city: "高雄市鳳山區文龍東路", items: [
    { no: "牛1-59", unit: "59號", manager: "文榮" },
    { no: "牛1-61", unit: "61號", manager: "洪漳" },
    { no: "牛1-57巷2", unit: "57巷2號", manager: "浩鈞" },
    { no: "牛1-57巷6", unit: "57巷6號", manager: "文彬" },
    { no: "牛1-57巷8", unit: "57巷8號", manager: "苡真" }
  ]},
  { group: "牛2", street: "文龍東路", company: "信潔", city: "高雄市鳳山區文龍東路", items: [
    { no: "牛2-21", unit: "57巷1弄21號", manager: "洪漳" },
    { no: "牛2-23", unit: "57巷1弄23號", manager: "文榮" },
    { no: "牛2-25", unit: "57巷1弄25號", manager: "洪漳" },
    { no: "牛2-27", unit: "57巷1弄27號", manager: "" },
    { no: "牛2-29", unit: "57巷1弄29號", manager: "" },
    { no: "牛2-31", unit: "57巷1弄31號", manager: "" },
    { no: "牛2-33", unit: "57巷1弄33號", manager: "浩鈞" },
    { no: "牛2-35", unit: "57巷1弄35號", manager: "苡真" }
  ]},
  { group: "牛3", street: "鳳仁路", company: "信潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛3-97-61", unit: "97-61號", manager: "", company: "統潔" },
    { no: "牛3-97-63", unit: "97-63號", manager: "成、賢" },
    { no: "牛3-97-65A", unit: "97-65A號", manager: "成、賢" },
    { no: "牛3-97-65B", unit: "97-65B號", manager: "賢" }
  ]},
  { group: "牛5", street: "鳳仁路", company: "信潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛5-66", unit: "97-66號", manager: "" },
    { no: "牛5-67", unit: "97-67號", manager: "" },
    { no: "牛5-68", unit: "97-68號", manager: "" },
    { no: "牛5-69", unit: "97-69號", manager: "" },
    { no: "牛5-70", unit: "97-70號", manager: "" },
    { no: "牛5-71", unit: "97-71號", manager: "" },
    { no: "牛5-72", unit: "97-72號", manager: "" },
    { no: "牛5-73", unit: "97-73號", manager: "" },
    { no: "牛5-75", unit: "97-75號", manager: "" },
    { no: "牛5-76", unit: "97-76號", manager: "" }
  ]},
  { group: "牛6", street: "鳳仁路", company: "信潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛6-55", unit: "55號", manager: "" },
    { no: "牛6-56", unit: "56號", manager: "" },
    { no: "牛6-57", unit: "57號", manager: "" },
    { no: "牛6-58", unit: "58號", manager: "" },
    { no: "牛6-59", unit: "59號", manager: "" },
    { no: "牛6-60", unit: "60號", manager: "" },
    { no: "牛6-61", unit: "61號", manager: "" },
    { no: "牛6-62", unit: "62號", manager: "" }
  ]},
  { group: "牛7", street: "鳳仁路", company: "統潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛7-1F", unit: "93-63號1樓", manager: "" },
    { no: "牛7-2F", unit: "93-63號2樓", manager: "" },
    { no: "牛7-3F", unit: "93-63號3樓", manager: "" }
  ]},
  { group: "牛8", street: "鳳仁路", company: "統潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛8-77", unit: "97-77號", manager: "錦芳" },
    { no: "牛8-78", unit: "97-78號", manager: "錦芳" }
  ]},
  { group: "拉皮", street: "鳳仁路", company: "統潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "拉皮-1A", unit: "93-1A號", manager: "" },
    { no: "拉皮-1B", unit: "93-1B號", manager: "" },
    { no: "拉皮-2A", unit: "93-2A號", manager: "" },
    { no: "拉皮-2B", unit: "93-2B號", manager: "" }
  ]},
  { group: "大樹", street: "九曲路", company: "統潔", city: "高雄市大樹區九曲路", items: [
    { no: "大樹-18", unit: "52巷32弄18號", manager: "" }
  ]}
];
const FACTORY_TENANT_INFO = {
  "拉皮-1A": { name: "南溢製鞋股份有限公司", taxId: "81265944", contactName: "徐志逢", phone: "0910-700-069", leaseStart: "2025-12-01", leaseEnd: "2029-11-30", rentUntaxed: 37000, rent: 38850, note: "114/12/1 未稅 $37,000；116/12/1 起未稅 $39,000" },
  "拉皮-2B": { name: "禹旺企業有限公司", taxId: "83394199", contactName: "林永紝", phone: "0927-223-207", leaseStart: "2025-12-01", leaseEnd: "2029-11-30", rentUntaxed: 38000, rent: 39900, note: "" },
  "牛7-1F": { name: "驊勝食品工業有限公司", taxId: "89187957", contactName: "陳昱廷", phone: "0913-897-288", leaseStart: "2026-01-01", leaseEnd: "2027-12-31", rentUntaxed: 65000, rent: 68250, note: "" },
  "牛7-2F": { name: "陳慧玲", taxId: "", contactName: "", phone: "", leaseStart: "2024-09-01", leaseEnd: "2027-08-31", rentUntaxed: 60000, rent: 63000, note: "" },
  "大樹-18": { name: "廣永隆生物科技有限公司", taxId: "90553919", contactName: "陳逸峯", phone: "0939-153-975", leaseStart: "2026-09-01", leaseEnd: "2031-05-31", rentUntaxed: 46000, rent: 48300, note: "116/9/1 未稅 $47,000；117/9/1 $48,000；118/9/1 $49,000；119/9/1 $50,000" },
  "牛8-77": { name: "錦芳食品有限公司", taxId: "24518498", contactName: "邱程塘", phone: "0935-455-938", leaseStart: "2022-07-01", leaseEnd: "2030-06-30", rentUntaxed: 40000, rent: 42000, note: "111/7/1～116/6/30 未稅 $40,000；116/7/1～119/6/30 未稅 $42,000" },
  "牛8-78": { name: "錦芳食品有限公司", taxId: "24518498", contactName: "邱程塘", phone: "0935-455-938", leaseStart: "2022-07-01", leaseEnd: "2030-06-30", rentUntaxed: 40000, rent: 42000, note: "111/7/1～116/6/30 未稅 $40,000；116/7/1～119/6/30 未稅 $42,000" },
  "牛3-97-61": { name: "台灣美博城國際股份有限公司", taxId: "24667829", contactName: "江金溝", phone: "0967-198-413", leaseStart: "2024-11-01", leaseEnd: "2029-10-31", rentUntaxed: 52000, rent: 54600, note: "113/11/1～116/10/31 未稅 $52,000；116/11/1～118/10/31 未稅 $55,000" },
  "拉皮-1B": { name: "鈺晟實業有限公司", taxId: "94068024", contactName: "黃泰穎", phone: "0927-982-900", leaseStart: "2025-01-01", leaseEnd: "2026-03-31", rentUntaxed: 40000, rent: 42000, note: "合約至 115/3/31" },
  "牛3-97-65A": { name: "昱銘國際開發有限公司", taxId: "24988951", contactName: "黃彥銘", phone: "0932-720-800", leaseStart: "2025-01-01", leaseEnd: "2029-12-31", rentUntaxed: 30000, rent: 31500, note: "114/1/1～116/12/31 未稅 $30,000；117/1/1～118/12/31 未稅 $33,000" },
  "牛3-97-65B": { name: "昱銘國際開發有限公司", taxId: "24988951", contactName: "黃彥銘", phone: "0932-720-800", leaseStart: "2025-03-01", leaseEnd: "2029-12-31", rentUntaxed: 20000, rent: 21000, note: "114/3/1～116/12/31 未稅 $20,000；117/1/1～118/12/31 未稅 $22,000" },
  "牛3-97-63": { name: "世鋼企業有限公司", taxId: "84997856", contactName: "余世鋼", phone: "0932-898-898", leaseStart: "2025-11-01", leaseEnd: "2029-10-31", rentUntaxed: 65000, rent: 68250, note: "114/11/1～115/10/31 未稅 $65,000；115/11/1～118/10/31 未稅 $68,000" },
  "牛2-25": { name: "凱薩琳食品有限公司", taxId: "16995828", contactName: "林淑惠", phone: "0932-730-739／07-792-6088", leaseStart: "2025-07-01", leaseEnd: "2029-06-30", rentUntaxed: 38000, rent: 39900, note: "114/7/1～116/6/30 未稅 $38,000；116/7/1～118/6/30 未稅 $40,000" },
  "牛1-57巷8": { name: "凱薩琳食品有限公司", taxId: "16995828", contactName: "林淑惠", phone: "0932-730-739／07-792-6088", leaseStart: "2025-06-01", leaseEnd: "2029-05-31", rentUntaxed: 30000, rent: 31500, note: "114/6/1～116/5/31 未稅 $30,000；116/6/1～118/5/31 未稅 $33,000" },
  "牛2-31": { name: "凱薩琳食品有限公司", taxId: "16995828", contactName: "林淑惠", phone: "0932-730-739／07-792-6088", leaseStart: "2025-07-01", leaseEnd: "2029-06-30", rentUntaxed: 30000, rent: 31500, note: "114/7/1～116/6/30 未稅 $30,000；116/7/1～118/6/30 未稅 $33,000" },
  "牛2-33": { name: "凱薩琳食品有限公司", taxId: "16995828", contactName: "林淑惠", phone: "0932-730-739／07-792-6088", leaseStart: "2025-08-01", leaseEnd: "2029-07-31", rentUntaxed: 30000, rent: 31500, note: "114/8/1～116/7/31 未稅 $30,000；116/8/1～118/7/31 未稅 $33,000" },
  "牛2-35": { name: "凱薩琳食品有限公司", taxId: "16995828", contactName: "林淑惠", phone: "0932-730-739／07-792-6088", leaseStart: "2025-08-01", leaseEnd: "2029-07-31", rentUntaxed: 30000, rent: 31500, note: "114/8/1～116/7/31 未稅 $30,000；116/8/1～118/7/31 未稅 $33,000" },
  "牛1-57巷6": { name: "凱薩琳食品有限公司", taxId: "16995828", contactName: "林淑惠", phone: "0932-730-739／07-792-6088", leaseStart: "2025-07-01", leaseEnd: "2029-06-30", rentUntaxed: 30000, rent: 31500, note: "114/7/1～116/6/30 未稅 $30,000；116/7/1～118/6/30 未稅 $33,000" },
  "牛1-61": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" },
  "牛1-59": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" },
  "牛1-57巷2": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" },
  "牛2-21": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" },
  "牛2-23": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" },
  "牛2-27": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" },
  "牛2-29": { name: "富強鑫精密工業股份有限公司", taxId: "22552976", contactName: "蔡承璋", phone: "0928-777-666／07-703-5456#203", leaseStart: "2024-08-01", leaseEnd: "2028-07-31", rentUntaxed: 115000, rent: 120750, note: "113/8/1～115/7/31 未稅 $110,000；115/8/1～117/7/31 未稅 $115,000" }
};
const FACTORY_GROUP_ORDER = FACTORY_GROUPS.map(g => g.group);
const SOLAR_FACTORY_NOS = ["牛1-59", "牛1-61", "牛1-57巷2", "牛1-57巷6", "牛1-57巷8"];
const PHOTO_SET = [
  ["images/studio-room.jpg?v=1713", "images/kitchen.jpg"],
  ["images/studio-room.jpg?v=1713", "images/bath.jpg"],
  ["images/studio-room.jpg?v=1713", "images/living.jpg"],
  ["images/studio-room.jpg?v=1713", "images/bedroom.jpg"]
];
const FACTORY_PHOTO_SET = [
  ["images/factory-a.jpg?v=1441"],
  ["images/factory-a.jpg?v=1441"],
  ["images/factory-a.jpg?v=1441"]
];
function isUsablePhoto(src) {
  return typeof src === "string" && (src.startsWith("data:image") || src.startsWith("images/") || src.startsWith("blob:") || src.startsWith("http"));
}
const PHOTO_STYLE_VER = "iso-white-studio-home-2";
const FACTORY_PHOTO_STYLE_VER = "iso-white-factory-park-1";
function ensurePhotos(r) {
  if (!Array.isArray(r.photos)) r.photos = [];
  const factory = r.kind === "factory";
  const ver = factory ? FACTORY_PHOTO_STYLE_VER : PHOTO_STYLE_VER;
  if (r.photoStyle !== ver) {
    r.photos = photosFor(r.no, factory ? "factory" : "studio").slice();
    r.photoStyle = ver;
  }
  r.photos = r.photos.filter(isUsablePhoto).slice(0, 5);
  if (!r.photos.length) r.photos = photosFor(r.no, factory ? "factory" : "studio").slice();
}
function photosFor(no, kind) {
  const set = kind === "factory" ? FACTORY_PHOTO_SET : PHOTO_SET;
  return set[Number(String(no).replace(/\D/g, "") || 0) % set.length];
}
function roomAddress(no) {
  const s = String(no).replace(/\D/g, "");
  if (s.length < 4) return "高雄市鳳山區文龍東路";
  return `高雄市鳳山區文龍東路${s.slice(0, 2)}號${s.charAt(2)}樓-${s.charAt(3)}室`;
}
const NEARBY_AREAS = {
  wenlong: {
    title: "文龍東路附近",
    lat: 22.6438, lng: 120.3732,
    pois: [
      { kind: "便利超商", name: "7-ELEVEN 文龍門市", lat: 22.6435, lng: 120.3730 },
      { kind: "便利超商", name: "全家便利商店 鳳山文龍店", lat: 22.6444, lng: 120.3722 },
      { kind: "超市", name: "全聯福利中心 鳳山文衡店", lat: 22.6408, lng: 120.3685 },
      { kind: "學校", name: "高雄市鳳山區中崙國小", lat: 22.6416, lng: 120.3708 },
      { kind: "學校", name: "高雄市立中崙國中", lat: 22.6402, lng: 120.3695 },
      { kind: "餐廳", name: "麥當勞 鳳山文衡店", lat: 22.6395, lng: 120.3672 },
      { kind: "醫療", name: "高雄市立鳳山醫院", lat: 22.6265, lng: 120.3608 },
      { kind: "交通", name: "臺鐵鳳山車站", lat: 22.6314, lng: 120.3578 },
      { kind: "景點", name: "衛武營國家藝術文化中心", lat: 22.6247, lng: 120.3419 }
    ]
  },
  fengren: {
    title: "鳳仁路附近",
    lat: 22.6358, lng: 120.3756,
    pois: [
      { kind: "便利超商", name: "7-ELEVEN 鳳仁門市", lat: 22.6354, lng: 120.3752 },
      { kind: "便利超商", name: "全家便利商店 鳳山鳳仁店", lat: 22.6366, lng: 120.3760 },
      { kind: "超市", name: "全聯福利中心 鳳山鳳仁店", lat: 22.6348, lng: 120.3740 },
      { kind: "學校", name: "高雄市鳳山區中崙國小", lat: 22.6416, lng: 120.3708 },
      { kind: "餐廳", name: "丹丹漢堡 鳳仁店", lat: 22.6339, lng: 120.3736 },
      { kind: "醫療", name: "高雄市立鳳山醫院", lat: 22.6265, lng: 120.3608 },
      { kind: "景點", name: "澄清湖風景區", lat: 22.6578, lng: 120.3496 },
      { kind: "交通", name: "臺鐵鳳山車站", lat: 22.6314, lng: 120.3578 }
    ]
  },
  dashu: {
    title: "大樹九曲路附近",
    lat: 22.6558, lng: 120.4212,
    pois: [
      { kind: "交通", name: "臺鐵九曲堂車站", lat: 22.6564, lng: 120.4210 },
      { kind: "便利超商", name: "7-ELEVEN 九曲堂門市", lat: 22.6560, lng: 120.4202 },
      { kind: "便利超商", name: "全家便利商店 大樹九曲店", lat: 22.6548, lng: 120.4194 },
      { kind: "學校", name: "高雄市大樹區九曲國小", lat: 22.6536, lng: 120.4180 },
      { kind: "餐廳", name: "九曲堂周邊小吃", lat: 22.6552, lng: 120.4206 },
      { kind: "景點", name: "佛光山", lat: 22.7480, lng: 120.4456 },
      { kind: "醫療", name: "大樹區衛生所", lat: 22.6896, lng: 120.4328 }
    ]
  }
};
function nearbyArea(r) {
  const blob = [r && r.location, r && r.street, r && r.group, r && r.no, r && r.city].map(x => String(x || "")).join(" ");
  if (/大樹|九曲/.test(blob)) return NEARBY_AREAS.dashu;
  if (/鳳仁|牛3|牛5|牛6|牛7|牛8|拉皮/.test(blob)) return NEARBY_AREAS.fengren;
  return NEARBY_AREAS.wenlong;
}
function poiNavUrl(p) {
  const name = encodeURIComponent(p.name);
  if (typeof isIOS === "function" && isIOS()) return "https://maps.apple.com/?daddr=" + p.lat + "," + p.lng + "&q=" + name + "&dirflg=d";
  return "https://www.google.com/maps/dir/?api=1&destination=" + p.lat + "," + p.lng + "&travelmode=driving";
}
function nearbySheetHtml() {
  if (!ui.nearbyOpen) return "";
  const area = nearbyArea(typeof myRoom === "function" ? myRoom() : null);
  const lat = area.lat, lng = area.lng;
  const bbox = (lng - 0.014) + "," + (lat - 0.011) + "," + (lng + 0.014) + "," + (lat + 0.011);
  const pois = area.pois || [];
  ui.nearbyPois = pois;
  return `<div class="install-mask" id="nearby-mask">
    <div class="install-sheet nearby-sheet">
      <div class="label">周邊景點</div>
      <h2>${escapeHtml(area.title)}</h2>
      <p class="small">點下面項目，會打開手機地圖導航。</p>
      <iframe class="nearby-map" title="附近地圖" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="poi-list">${pois.map((p, i) => `<button type="button" class="poi-item" data-poi="${i}"><span class="poi-kind">${escapeHtml(p.kind)}</span><span class="poi-name">${escapeHtml(p.name)}</span><span class="poi-go">導航</span></button>`).join("")}</div>
      <button class="ghost" id="nearby-close" type="button">關閉</button>
    </div>
  </div>`;
}
function photoEl(src, no) {
  if (!src || String(src).length < 8) src = photosFor(no || "6821")[0];
  return `<img src="${src}" alt="${no || ""}">`;
}
function playRoomHero() {
  document.querySelectorAll(".room-hero-video").forEach(v => {
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  });
}
function playHomeSlides() {
  if (ui.page !== "home") return;
  const ease = "cubic-bezier(.22,.82,.22,1)";
  const run = (el, from) => {
    if (!el || !el.animate) return;
    try { el.getAnimations().forEach(a => a.cancel()); } catch {}
    el.animate(
      [{ transform: from, opacity: 1 }, { transform: "translateX(0)", opacity: 1 }],
      { duration: 900, easing: ease, fill: "both" }
    );
  };
  document.querySelectorAll(".ann-card").forEach((el, i) => {
    setTimeout(() => run(el, "translateX(-80%)"), i * 70);
  });
  run(document.querySelector(".hello-card"), "translateX(-80%)");
  run(document.querySelector(".hero-card"), "translateX(80%)");
}
function amenityVideoHtml(src, poster) {
  return `<div class="photos photos-video slide-left">
    <video class="room-hero-video" autoplay muted loop playsinline webkit-playsinline poster="${poster}">
      <source src="${src}" type="video/mp4">
    </video>
  </div>`;
}
function factoryRooms() {
  const out = [];
  FACTORY_GROUPS.forEach(g => {
    g.items.forEach(item => {
      const info = FACTORY_TENANT_INFO[item.no];
      out.push({
        id: "f" + item.no.replace(/[^\w\u4e00-\u9fff-]/g, ""),
        no: item.no,
        title: "廠房",
        kind: "factory",
        group: g.group,
        street: g.street,
        company: item.company || g.company,
        manager: item.manager || "",
        location: g.city + item.unit,
        rent: info && info.rent ? info.rent : 0,
        rentUntaxed: info && info.rentUntaxed ? info.rentUntaxed : 0,
        deposit: 0,
        status: info && info.name ? "rented" : "vacant",
        tenantId: null,
        photos: photosFor(item.no, "factory"),
        amenities: ["電力", "停車"],
        utilities: { electric: "依約自付", water: "依約自付" },
        contractImages: []
      });
    });
  });
  return out;
}

function buildSeed() {
  const rooms = [];
  const tenants = [];
  let ti = 1;
  STUDIO_NOS.forEach((no, i) => {
    const id = "r" + no;
    const info = TENANT_INFO[no];
    const name = info && info.name ? info.name : "";
    const tid = name ? "t" + ti++ : null;
    const bld = STUDIO_BUILDINGS.find(b => b.prefix === studioPrefix(no));
    rooms.push({
      id, no, title: isStoreNo(no) ? "店面" : "套房",
      rent: name ? 10000 : (isStoreNo(no) ? 0 : 10000), deposit: name ? 25600 : 0,
      kind: isStoreNo(no) ? "store" : "studio",
      shop: (info && info.shop) || "",
      group: bld ? bld.no : "",
      street: bld ? bld.street : "",
      company: bld ? bld.company : "統潔",
      status: name ? "rented" : "vacant",
      tenantId: tid, photos: photosFor(no), amenities: AMENITIES,
      utilities: { electric: "5樓設有自助儲值機可以刷卡儲值", water: "一年固定 $1,800" },
      contractImages: [], location: roomAddress(no)
    });
    if (!name) return;
    tenants.push({
      id: tid, name,
      phone: info.phone || "",
      idNo: "",
      address: "",
      emergencyName: "",
      emergencyPhone: "",
      roomId: id,
      leaseStart: info.leaseStart || "",
      leaseEnd: info.leaseEnd || "",
      dueDay: 5,
      paid: true,
      note: "",
      bankLast5: info.bankLast5 || ""
    });
  });
  rooms.push({
    id: "r7651", no: "7651", title: "辦公室", rent: 0, deposit: 0, status: "office", kind: "studio",
    tenantId: null, photos: photosFor("7651"), amenities: ["冷氣", "網路", "書桌椅"],
    utilities: { electric: "公司自付", water: "公司自付" }, contractImages: [], location: roomAddress("7651")
  });
  factoryRooms().forEach(r => {
    const info = FACTORY_TENANT_INFO[r.no];
    if (info && info.name) {
      const tid = "tf-" + r.no;
      r.tenantId = tid;
      r.status = "rented";
      r.rent = info.rent || 0;
      r.rentUntaxed = info.rentUntaxed || 0;
      tenants.push({
        id: tid, name: info.name, phone: info.phone || "", taxId: info.taxId || "",
        contactName: info.contactName || "", idNo: "", address: "",
        emergencyName: "", emergencyPhone: "", roomId: r.id,
        leaseStart: info.leaseStart || "", leaseEnd: info.leaseEnd || "",
        dueDay: 5, paid: true, note: info.note || "", rentUntaxed: info.rentUntaxed || 0
      });
    }
    rooms.push(r);
  });
  const t6831 = tenants.find(t => t.roomId === "r6831");
  return {
    rooms, tenants,
    repairs: [{ id: "rep1", roomId: "r6831", tenantId: t6831 ? t6831.id : "t3", type: "熱水器", note: "忽冷忽熱，晚上完全沒熱水", photo: null, status: "open", createdAt: "2026-08-24 21:10" }],
    notices: [{ id: "n1", type: "repair", repairId: "rep1", roomNo: "6831", text: "6831 熱水器報修", createdAt: "2026-08-24 21:10", read: false }],
    announcements: [],
    houseRules: DEFAULT_RULES,
    renewals: []
  };
}
const BOOKS_IMPORT_VER = "july115-v1";
const JULY115_OPENINGS = {
  "現金(保險箱)": 633129,
  "統潔": 535285,
  "信潔": 6232074,
  "個人戶·趙文榮": 200663,
  "個人戶·趙洪漳": 563128,
  "個人戶·趙浩鈞": 352383,
  "個人戶·趙文彬": 160758,
  "個人戶·趙苡真": 330851,
  "個人戶·趙海成、趙正賢": 431362
};
const JULY115_BOOKS = [
  ["2026-07-02", "in", 46000, "現金(保險箱)", "租金收入　文21(牛2)"],
  ["2026-07-03", "out", 5455, "現金(保險箱)", "清潔費支出(皇吉)　租賃$4500、保費$950、手續費$5"],
  ["2026-07-03", "out", 20000, "現金(保險箱)", "薪資支出　趙文榮"],
  ["2026-07-03", "out", 20000, "現金(保險箱)", "薪資支出　趙洪漳"],
  ["2026-07-06", "in", 55000, "現金(保險箱)", "租金收入　文23(牛2)"],
  ["2026-07-06", "in", 22000, "現金(保險箱)", "租金收入　鳳97-65B(牛3)"],
  ["2026-07-08", "in", 45000, "現金(保險箱)", "租金收入　鳳93-2A(拉皮)"],
  ["2026-07-08", "in", 21690, "現金(保險箱)", "電費收入　93-2A　115/4/29～115/5/27"],
  ["2026-07-09", "out", 200000, "現金(保險箱)", "個人支出　趙海成存聯邦"],
  ["2026-07-09", "out", 200000, "現金(保險箱)", "個人支出　趙正賢存聯邦"],
  ["2026-07-09", "in", 120000, "現金(保險箱)", "租金收入（其他收入欄）　文59繳交115/1、2月欠租"],
  ["2026-07-09", "out", 10000, "現金(保險箱)", "清潔費支出　牛10（5/15、5/26、6/1、6/8、6/23）"],
  ["2026-07-09", "out", 1000, "現金(保險箱)", "清潔費支出　成$500、賢$500（垃圾桶）"],
  ["2026-07-09", "in", 13221, "現金(保險箱)", "清潔費支出　牛5（垃圾桶）　※原表列在其他收入"],
  ["2026-07-10", "in", 46000, "現金(保險箱)", "租金收入　大樹"],
  ["2026-07-16", "in", 1800, "現金(保險箱)", "其他收入　文東57巷17弄（菊春廠房）水費"],
  ["2026-07-16", "out", 8630, "現金(保險箱)", "水費支出　文東59 $615、文東61 $8015（牛1）"],
  ["2026-07-20", "in", 14000, "現金(保險箱)", "增建收入　錦芳"],
  ["2026-07-20", "out", 2000, "現金(保險箱)", "其他支出　趙先生除草"],
  ["2026-07-22", "in", 1530, "現金(保險箱)", "水費收入　鳳97-69喜憨兒　115/4/11～6/11（牛5）"],
  ["2026-07-22", "in", 6750, "現金(保險箱)", "水費收入　鳳97-71莊記　115/4/11～6/11（牛5）"],
  ["2026-07-25", "in", 18300, "現金(保險箱)", "電費收入　牛10"],
  ["2026-07-25", "in", 7200, "現金(保險箱)", "水費收入　牛10"],
  ["2026-07-31", "in", 79700, "現金(保險箱)", "電費收入　鈺晟115/5/28～7/1（拉皮93-1B）"],
  ["2026-07-31", "in", 31200, "現金(保險箱)", "水費收入　鈺晟115/1/1～6/30（拉皮93-1B）"],
  ["2026-07-31", "in", 315000, "統潔", "租金收入　牛7＋牛8＋拉皮匯款"],
  ["2026-07-07", "in", 54600, "統潔", "租金收入　牛3（97-61）美博城"],
  ["2026-07-31", "in", 3524, "統潔", "造得科技"],
  ["2026-07-03", "out", 63030, "統潔", "屏東　康莊工程"],
  ["2026-07-03", "out", 124222, "統潔", "薪資"],
  ["2026-07-09", "out", 10500, "統潔", "電子鎖安裝　牛10"],
  ["2026-07-16", "out", 28861, "統潔", "水費　93-2 $23002、93-63 $71、$5788"],
  ["2026-07-16", "out", 106479, "統潔", "電費　93-1"],
  ["2026-07-16", "out", 58830, "統潔", "4戶烤漆門　牛10"],
  ["2026-07-23", "out", 11090, "統潔", "電費　楠梓"],
  ["2026-07-23", "out", 295, "統潔", "電話費"],
  ["2026-07-23", "out", 17774, "統潔", "太陽能險　文59、61　文57巷2、6、8"],
  ["2026-07-27", "out", 8558, "統潔", "工程款　支存"],
  ["2026-07-30", "out", 14979, "統潔", "勞保費"],
  ["2026-07-30", "out", 8840, "統潔", "健保費"],
  ["2026-07-30", "out", 7860, "統潔", "勞退金"],
  ["2026-07-31", "in", 1119800, "信潔", "租金收入　牛5、牛6"],
  ["2026-07-14", "out", 21528, "信潔", "水費支出"],
  ["2026-07-08", "out", 23121, "信潔", "利息支出"],
  ["2026-07-14", "out", 95839, "信潔", "營業稅支出"],
  ["2026-07-09", "out", 13912, "信潔", "垃圾清運支出"],
  ["2026-07-01", "in", 28302, "個人戶·趙文榮", "薪資／伙食"],
  ["2026-07-31", "in", 61055, "個人戶·趙文榮", "退綜所稅"],
  ["2026-07-01", "in", 45000, "個人戶·趙洪漳", "租金　文東61號"],
  ["2026-07-31", "in", 33706, "個人戶·趙洪漳", "退綜所稅"],
  ["2026-07-20", "in", 35500, "個人戶·趙浩鈞", "租金　文東33號"],
  ["2026-07-31", "in", 24517, "個人戶·趙浩鈞", "退綜所稅"],
  ["2026-07-10", "in", 70000, "個人戶·趙文彬", "租金　57巷2、6巷"],
  ["2026-07-31", "in", 25599, "個人戶·趙文彬", "退綜所稅"],
  ["2026-07-10", "in", 36000, "個人戶·趙苡真", "租金　57巷8號"],
  ["2026-07-15", "in", 70312, "個人戶·趙苡真", "租金　文東35號"],
  ["2026-07-01", "in", 40800, "個人戶·趙海成、趙正賢", "租金　鳳仁63號　原日期115/6/30　房租$40000、貨櫃$800"],
  ["2026-07-03", "in", 12000, "個人戶·趙海成、趙正賢", "租金　鳳仁65A（六月份遲繳）"]
];
const SEED = buildSeed();
let state;
try { state = loadLocal(); } catch (err) {
  try { console.error(err); } catch {}
  state = structuredClone(SEED);
}
let ui = { role: null, page: "home", roomId: null, tenantId: null, roomNo: "", loginError: "", repairType: "冷氣", repairNote: "", toast: "", repairMedia: [], announceEditId: null, announceOpen: false, errandOpen: false, bankOpen: false, aiOpen: false, announceMedia: [], editAnnounceMedia: [], assetKind: "studio", tenantKind: "studio", studioBldg: null, lineBinds: { byRoom: {}, byUser: {} }, cloudOk: null, bankMedia: [], errandMedia: [], themeOpen: false, firmPeriod: {}, editBookId: null, editSlipId: null, adminCode: "", installSheet: "", updateNotes: false, updateReady: false };
let saveTimer = 0;
let presenceTimer = 0;

function normalize(data) {
  if (!data) data = structuredClone(SEED);
  if (!Array.isArray(data.rooms)) data.rooms = [];
  if (!Array.isArray(data.tenants)) data.tenants = [];
  STUDIO_NOS.forEach(no => {
    if (!data.rooms.some(r => r.no === no)) {
      const seedRoom = SEED.rooms.find(r => r.no === no);
      const seedTenant = SEED.tenants.find(t => t.roomId === "r" + no);
      if (seedRoom) data.rooms.push(structuredClone(seedRoom));
      if (seedTenant && !data.tenants.some(t => t.roomId === seedTenant.roomId)) data.tenants.push(structuredClone(seedTenant));
    }
  });
  factoryRooms().forEach(seedRoom => {
    if (!data.rooms.some(r => r.id === seedRoom.id || r.no === seedRoom.no)) data.rooms.push(structuredClone(seedRoom));
  });
  data.rooms = data.rooms.filter(r => !(r.kind === "factory" && /^牛10-/.test(String(r.no || ""))));
  data.rooms.forEach(r => {
    if (!Array.isArray(r.contractImages)) r.contractImages = [];
    if (!r.kind) r.kind = r.title === "廠房" ? "factory" : "studio";
    if (r.no === "7651") r.kind = "studio";
    ensurePhotos(r);
    if (r.manager === "洪潭") r.manager = "洪漳";
    if (!r.utilities) r.utilities = {};
    if (r.kind !== "factory" && r.status !== "office") {
      if (!r.utilities.electric) r.utilities.electric = "5樓設有自助儲值機可以刷卡儲值";
      if (!r.utilities.water || /每月定額/.test(r.utilities.water)) r.utilities.water = "一年固定 $1,800";
      if (!r.rent) r.rent = 10000;
    }
    if (r.title === "套房" && Array.isArray(r.amenities)) {
      ["機車停車格", "床鋪", "電梯", "飲水機"].forEach(x => { if (!r.amenities.includes(x)) r.amenities.push(x); });
    }
  });
  if (!Array.isArray(data.notices)) data.notices = [];
  if (!Array.isArray(data.announcements)) data.announcements = [];
  data.announcements.forEach(a => {
    if (a.postedBy) return;
    const logs = (data.auditLogs || []).filter(x =>
      String(x.page || "") === "公告" && /已發布公告|已更新公告/.test(String(x.detail || ""))
    );
    const last = logs[logs.length - 1];
    const who = last ? String(last.who || "") : "";
    if (last && (last.kind === "dev" || /1240/.test(who))) a.postedBy = "1240";
    else if (/7651/.test(who)) a.postedBy = "7651";
    else if (/1976/.test(who)) a.postedBy = "1976";
  });
  if (!data.houseRules) data.houseRules = DEFAULT_RULES;
  else data.houseRules = String(data.houseRules).replace(/水費為每月定額[。]?/, "水費為一年固定 $1,800。");
  if (!Array.isArray(data.renewals)) data.renewals = [];
  if (!Array.isArray(data.bankSlips)) data.bankSlips = [];
  if (!Array.isArray(data.aiLogs)) data.aiLogs = [];
  if (!Array.isArray(data.books)) data.books = [];
  data.books = data.books.filter(b => b && b.id !== "bk1787845528053");
  if (!Array.isArray(data.errands)) data.errands = [];
  stripHeavyMedia(data);
  if (!Array.isArray(data.auditLogs)) data.auditLogs = [];
  if (!data.presence || typeof data.presence !== "object") data.presence = {};
  if (!data.accountOpenings || typeof data.accountOpenings !== "object") data.accountOpenings = {};
  data.rooms.forEach(r => {
    if (r.status === "office" || r.kind === "factory") return;
    const busy = (data.repairs || []).some(x => x.roomId === r.id && x.status !== "done");
    if (busy) r.status = "repair";
  });
  data.tenants.forEach(t => {
    const room = data.rooms.find(r => r.id === t.roomId);
    if (!room || room.status === "office" || room.kind === "factory") return;
    if (!t.name && Object.prototype.hasOwnProperty.call(TENANT_BY_ROOM, room.no)) t.name = TENANT_BY_ROOM[room.no];
  });
  if (data.tenantRosterVer !== TENANT_ROSTER_VER) {
    applyTenantRoster(data);
    data.tenantRosterVer = TENANT_ROSTER_VER;
  }
  applyFactoryRoster(data);
  data.factoryRosterVer = FACTORY_ROSTER_VER;
  applyJuly115Books(data);
  return data;
}
function applyJuly115Books(data) {
  if (!data || data.booksImportVer === BOOKS_IMPORT_VER) return;
  if (!Array.isArray(data.books)) data.books = [];
  data.books = data.books.filter(b => b.importTag !== "july115");
  JULY115_BOOKS.forEach((row, i) => {
    data.books.push({
      id: "bk-j115-" + i,
      type: row[1],
      date: row[0],
      amount: row[2],
      company: row[3],
      note: row[4],
      roomNo: "",
      importTag: "july115",
      createdAt: "2026-07-31 12:00"
    });
  });
  if (!data.accountOpenings || typeof data.accountOpenings !== "object") data.accountOpenings = {};
  Object.keys(JULY115_OPENINGS).forEach(k => { data.accountOpenings[k] = JULY115_OPENINGS[k]; });
  data.booksImportVer = BOOKS_IMPORT_VER;
}
function applyFactoryRoster(data) {
  factoryRooms().forEach(seedRoom => {
    let room = data.rooms.find(r => r.id === seedRoom.id || r.no === seedRoom.no);
    if (!room) {
      room = structuredClone(seedRoom);
      data.rooms.push(room);
    } else {
      room.group = seedRoom.group;
      room.street = seedRoom.street;
      room.company = seedRoom.company;
      room.location = seedRoom.location;
      room.manager = seedRoom.manager;
      room.kind = "factory";
      room.title = "廠房";
    }
    const info = FACTORY_TENANT_INFO[room.no];
    if (!info || !info.name) return;
    let t = data.tenants.find(x => x.roomId === room.id);
    if (!t) {
      t = { id: "tf-" + room.no, roomId: room.id, dueDay: 5, paid: true, idNo: "", address: "", emergencyName: "", emergencyPhone: "" };
      data.tenants.push(t);
    }
    t.name = info.name;
    t.phone = info.phone || "";
    t.taxId = info.taxId || "";
    t.contactName = info.contactName || "";
    t.leaseStart = info.leaseStart || "";
    t.leaseEnd = info.leaseEnd || "";
    t.note = info.note || "";
    t.rentUntaxed = info.rentUntaxed || 0;
    room.tenantId = t.id;
    room.rent = info.rent || room.rent;
    room.rentUntaxed = info.rentUntaxed || 0;
    if (room.status !== "repair") room.status = "rented";
  });
}
function applyTenantRoster(data) {
  STUDIO_NOS.forEach(no => {
    const info = TENANT_INFO[no];
    let room = data.rooms.find(r => r.no === no);
    if (!room) {
      const seedRoom = SEED.rooms.find(r => r.no === no);
      if (seedRoom) {
        room = structuredClone(seedRoom);
        data.rooms.push(room);
      }
    }
    if (!room || room.status === "office") return;
    const bld = STUDIO_BUILDINGS.find(b => b.prefix === studioPrefix(no));
    if (bld) {
      if (!room.group) room.group = bld.no;
      if (!room.street) room.street = bld.street;
      if (!room.company) room.company = bld.company;
    }
    if (info && info.name) {
      let t = data.tenants.find(x => x.roomId === room.id);
      if (!t) {
        t = { id: "t" + no, roomId: room.id, dueDay: 5, paid: true };
        data.tenants.push(t);
      }
      t.name = info.name;
      t.phone = info.phone || "";
      t.leaseStart = info.leaseStart || "";
      t.leaseEnd = info.leaseEnd || "";
      t.bankLast5 = info.bankLast5 || "";
      t.note = info.shop ? ("店面：" + info.shop) : (t.note || "");
      if (isStoreNo(no)) {
        room.kind = "store";
        room.title = "店面";
        room.shop = info.shop || room.shop || "";
        if (!room.rent) room.rent = 10000;
      } else if (room.kind !== "factory") room.rent = 10000;
      room.tenantId = t.id;
      if (room.status !== "repair") room.status = "rented";
    } else {
      if (isStoreNo(no)) {
        room.kind = "store";
        room.title = "店面";
      }
      if (room.status !== "repair") room.status = "vacant";
      data.tenants = data.tenants.filter(x => x.roomId !== room.id);
      room.tenantId = null;
    }
  });
}
function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch {}
  return normalize(structuredClone(SEED));
}
async function pullCloud() {
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), 6000) : 0;
  try {
    const res = await fetch(DATA_API, { headers: { "X-Tongjie-Key": SYNC_KEY }, signal: ctrl ? ctrl.signal : undefined });
    if (!res.ok) { ui.cloudOk = false; return false; }
    const data = await res.json();
    if (!data || !Array.isArray(data.rooms) || !data.rooms.length) { ui.cloudOk = true; return false; }
    mergePresenceInto(state, data);
    if (state.updatedAt && data.updatedAt && data.updatedAt < state.updatedAt) {
      applyTenantRoster(state);
      applyFactoryRoster(state);
      ui.cloudOk = true;
      return "local-newer";
    }
    if (state.updatedAt && data.updatedAt && data.updatedAt === state.updatedAt) {
      ui.cloudOk = true;
      return "same";
    }
    const mine = state.presence;
    state = normalize(data);
    mergePresenceInto(state, { presence: mine });
    localStorage.setItem(KEY, JSON.stringify(state));
    ui.cloudOk = true;
    return true;
  } catch {
    ui.cloudOk = false;
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
function mergePresenceInto(target, other) {
  if (!target.presence || typeof target.presence !== "object") target.presence = {};
  const src = (other && other.presence) || {};
  Object.keys(src).forEach(id => {
    const a = target.presence[id];
    const b = src[id];
    if (!b || !b.at) return;
    if (!a || b.at > a.at) target.presence[id] = b;
  });
}
function coreSig(d) {
  try {
    return JSON.stringify({
      b: d.books, o: d.accountOpenings, r: d.repairs, a: d.announcements,
      n: d.renewals, s: d.bankSlips, e: d.errands,
      t: (d.tenants || []).map(x => [x.id, x.paid, x.name, x.loginPass, x.paidAt, x.note]),
      m: (d.rooms || []).map(x => [x.id, x.status, x.rent])
    });
  } catch { return String(d && d.updatedAt); }
}
const ONLINE_MS = 90000;
function presenceKey() {
  if (ui.role === "tenant" && ui.tenantId) return ui.tenantId;
  if (ui.role === "admin" && ui.adminCode) return "admin-" + ui.adminCode;
  return "";
}
function presenceKindOf(id, p) {
  if (p && p.kind) return p.kind;
  const code = (p && p.code) || (String(id).startsWith("admin-") ? String(id).slice(6) : "");
  if (code === "1240") return "dev";
  if (String(id).startsWith("admin-")) return "admin";
  return "tenant";
}
function presencePayload() {
  const id = presenceKey();
  if (!id) return null;
  const kind = ui.role === "tenant" ? "tenant" : (ui.adminCode === "1240" ? "dev" : "admin");
  let name = "";
  let roomNo = ui.roomNo || "";
  if (ui.role === "tenant") {
    const t = typeof me === "function" ? me() : null;
    name = (t && t.name) || "";
    const r = typeof myRoom === "function" ? myRoom() : null;
    if (r && r.no) roomNo = r.no;
  } else {
    name = kind === "dev" ? "開發者" : "管理員";
  }
  return { at: Date.now(), kind, role: ui.role, code: ui.adminCode || "", roomNo, name, device: deviceInfo() };
}
function isOnline(id) {
  const p = (state.presence || {})[id];
  return !!(p && p.at && (Date.now() - p.at) < ONLINE_MS);
}
function isTenantOnline(id) { return isOnline(id); }
function beatPresence() {
  if (isDevPreview()) return;
  const id = presenceKey();
  const beat = presencePayload();
  if (!id || !beat) return;
  if (!state.presence || typeof state.presence !== "object") state.presence = {};
  state.presence[id] = beat;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  clearTimeout(presenceTimer);
  presenceTimer = setTimeout(pushPresence, 700);
}
async function pushPresence() {
  const id = presenceKey();
  const beat = presencePayload();
  if (!id || !beat) return;
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : 0;
  try {
    const res = await fetch(DATA_API, { headers: { "X-Tongjie-Key": SYNC_KEY }, signal: ctrl ? ctrl.signal : undefined });
    if (!res.ok) return;
    const data = await res.json();
    if (!data || !Array.isArray(data.rooms) || !data.rooms.length) return;
    const need = Object.keys(FACTORY_TENANT_INFO || {}).length;
    if (need && factoryNamedCount(data) < need) return;
    if (state.updatedAt && data.updatedAt && state.updatedAt > data.updatedAt) {
      mergePresenceInto(state, data);
      if (!state.presence) state.presence = {};
      state.presence[id] = beat;
      await pushCloud();
      return;
    }
    if (!data.presence || typeof data.presence !== "object") data.presence = {};
    mergePresenceInto(data, state);
    data.presence[id] = Object.assign({}, beat, { at: Date.now() });
    state.presence = data.presence;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
    await fetch(DATA_API, {
      method: "PUT",
      headers: { "X-Tongjie-Key": SYNC_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: ctrl ? ctrl.signal : undefined
    });
  } catch {}
  finally { if (timer) clearTimeout(timer); }
}
function logPresenceId(x) {
  const who = String((x && x.who) || "");
  const code = (who.match(/密碼\s*(\d+)/) || [])[1];
  if (code) return "admin-" + code;
  const no = (who.match(/^租客\s+(\S+)/) || [])[1];
  if (!no) return "";
  const room = state.rooms.find(r => String(r.no) === String(no));
  if (!room) return "";
  const t = state.tenants.find(n => n.roomId === room.id || n.id === room.tenantId);
  return t ? t.id : "";
}
function onlineStaffHtml() {
  const slots = [
    ["admin-1240", "開發者", "1240"],
    ["admin-1976", "管理員", "1976"],
    ["admin-7651", "管理員", "7651"]
  ];
  return slots.map(([id, label, code]) => {
    const on = isOnline(id);
    const p = (state.presence || {})[id] || {};
    const extra = on && p.device ? `<span class="small">${escapeHtml(p.device)}</span>` : "";
    return `<div class="online-row"><span class="k">${label}（${code}）</span><span class="row-end">${extra}<span class="live-pill${on ? " on" : ""}" data-online="${id}">${on ? "在線中" : "離線中"}</span></span></div>`;
  }).join("");
}
function onlineTenantLinesHtml() {
  const now = Date.now();
  const rows = Object.keys(state.presence || {}).map(id => {
    const p = state.presence[id];
    if (!p || !p.at || now - p.at >= ONLINE_MS) return null;
    if (presenceKindOf(id, p) !== "tenant") return null;
    const t = state.tenants.find(x => x.id === id);
    const room = t ? state.rooms.find(r => r.id === t.roomId) : null;
    const name = (t && t.name) || p.name || "租客";
    const no = (room && room.no) || p.roomNo || "";
    return `<div class="online-row"><span class="k">${escapeHtml(no ? no + "　" + name : name)}</span><span class="live-pill on" data-online="${id}">在線中</span></div>`;
  }).filter(Boolean);
  if (!rows.length) return `<div class="small">目前沒有租客在線</div>`;
  return rows.join("");
}
function refreshOnlineBadges() {
  document.querySelectorAll("[data-online]").forEach(el => {
    const on = isOnline(el.dataset.online);
    el.classList.toggle("on", on);
    if (!el.classList.contains("live-dot")) el.textContent = on ? "在線中" : "離線中";
  });
  const box = document.getElementById("online-tenants");
  if (box) box.innerHTML = onlineTenantLinesHtml();
}
function factoryNamedCount(data) {
  const rooms = (data && data.rooms) || [];
  const tenants = (data && data.tenants) || [];
  return tenants.filter(t => {
    if (!String(t && t.name || "").trim()) return false;
    const r = rooms.find(x => x.id === t.roomId);
    return r && r.kind === "factory";
  }).length;
}
async function pushCloud() {
  if (isDevPreview()) return;
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : 0;
  try {
    applyTenantRoster(state);
    applyFactoryRoster(state);
    const need = Object.keys(FACTORY_TENANT_INFO || {}).length;
    if (need && factoryNamedCount(state) < need) { ui.cloudOk = false; return; }
    state.updatedAt = Date.now();
    const res = await fetch(DATA_API, {
      method: "PUT",
      headers: { "X-Tongjie-Key": SYNC_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(state),
      signal: ctrl ? ctrl.signal : undefined
    });
    ui.cloudOk = res.ok;
  } catch { ui.cloudOk = false; }
  finally { if (timer) clearTimeout(timer); }
}
function save() {
  if (isDevPreview()) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushCloud, 400);
}
function persistUi() {
  try {
    if (!ui.role) return;
    const room = ui.role === "tenant"
      ? (state.rooms.find(r => r.id === ui.roomId) || (typeof myRoom === "function" ? myRoom() : null))
      : null;
    const snap = JSON.stringify({
      role: ui.role,
      page: ui.page,
      roomId: ui.roomId,
      tenantId: ui.tenantId,
      roomNo: room ? room.no : (ui.roomNo || ""),
      assetKind: ui.assetKind,
      tenantKind: ui.tenantKind,
      adminCode: ui.adminCode || "",
      devPreview: !!ui.devPreview
    });
    localStorage.setItem(UI_KEY, snap);
    sessionStorage.setItem(UI_KEY, snap);
    localStorage.removeItem("tongjie_ui_v1");
    sessionStorage.removeItem("tongjie_ui_v1");
  } catch {}
}
function readUiSnap() {
  const parse = raw => {
    try {
      const s = JSON.parse(raw);
      return s && s.role ? s : null;
    } catch { return null; }
  };
  try {
    return parse(localStorage.getItem(UI_KEY))
      || parse(sessionStorage.getItem(UI_KEY))
      || parse(localStorage.getItem("tongjie_ui_v1"))
      || parse(sessionStorage.getItem("tongjie_ui_v1"));
  } catch { return null; }
}
function restoreUi() {
  try {
    const s = readUiSnap();
    if (!s) return;
    ui.role = s.role;
    ui.page = s.page || (s.role === "admin" ? "dash" : "home");
    ui.roomId = s.roomId || null;
    ui.tenantId = s.tenantId || null;
    ui.roomNo = s.roomNo || "";
    ui.assetKind = s.assetKind || "studio";
    ui.tenantKind = s.tenantKind === "factory" ? "factory" : "studio";
    ui.adminCode = s.adminCode || "";
    ui.devPreview = !!(s.devPreview && (s.adminCode === "1240" || ui.adminCode === "1240"));
    if (ui.page === "tenant-login" || ui.page === "admin-login") {
      ui.page = s.role === "admin" ? "dash" : "home";
    }
    if (ui.devPreview) {
      ui.role = "tenant";
      ui.adminCode = "1240";
      ensureDevPreview();
      ui.tenantId = ui.devTenant.id;
      ui.roomId = ui.devRoom.id;
      ui.roomNo = ui.devRoom.no;
      if (!ui.page || ui.page === "dash") ui.page = "home";
      persistUi();
      return;
    }
    if (s.role === "tenant") {
      let t = (state.tenants || []).find(x => x.id === s.tenantId);
      let room = (state.rooms || []).find(r => r.id === s.roomId) || (s.roomNo ? (state.rooms || []).find(r => r.no === s.roomNo) : null);
      if (!t && room) t = (state.tenants || []).find(x => x.id === room.tenantId || x.roomId === room.id);
      if (!room && t) room = (state.rooms || []).find(r => r.id === t.roomId);
      if (t) ui.tenantId = t.id;
      if (room) {
        ui.roomId = room.id;
        ui.roomNo = room.no;
        if (!ui.tenantId) ui.tenantId = room.tenantId;
      }
    }
    persistUi();
  } catch {}
}
function clearSession() {
  ui.role = null; ui.page = "home"; ui.tenantId = null; ui.roomId = null; ui.roomNo = ""; ui.loginError = ""; ui.adminCode = "";
  ui.devPreview = false; ui.devTenant = null; ui.devRoom = null; ui.devRepairs = []; ui.devRenewals = []; ui.devReactions = {}; ui.devReadAnns = {};
  try {
    sessionStorage.removeItem(UI_KEY);
    localStorage.removeItem(UI_KEY);
    sessionStorage.removeItem("tongjie_ui_v1");
    localStorage.removeItem("tongjie_ui_v1");
  } catch {}
}

function syncRoomRepairStatus(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room || room.status === "office") return;
  const busy = state.repairs.some(x => x.roomId === roomId && x.status !== "done");
  if (busy) room.status = "repair";
  else if (room.status === "repair") room.status = room.tenantId ? "rented" : "vacant";
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/\"/g, "\u0026quot;")
    .replace(/'/g, "\u0026#39;");
}
function formatDateTime12(value) {
  if (!value) return "";
  const text = String(value);
  if (/上午|下午/.test(text)) return text;
  const m = text.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}):(\d{2})/);
  if (!m) return text;
  const hour24 = Number(m[2]);
  const period = hour24 >= 12 ? "下午" : "上午";
  let hour12 = hour24 % 12; if (hour12 === 0) hour12 = 12;
  return `${m[1]} ${period} ${hour12}:${m[3]}`;
}
function nowStamp() {
  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  const h = now.getHours();
  const period = h >= 12 ? "下午" : "上午";
  let h12 = h % 12; if (h12 === 0) h12 = 12;
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${period} ${h12}:${p(now.getMinutes())}`;
}
function toDatetimeLocal(value) {
  if (!value) return "";
  const text = String(value);
  const m12 = text.match(/^(\d{4}-\d{2}-\d{2})\s*(上午|下午)\s*(\d{1,2}):(\d{2})/);
  if (m12) {
    let h = Number(m12[3]) % 12;
    if (m12[2] === "下午") h += 12;
    return `${m12[1]}T${String(h).padStart(2, "0")}:${m12[4]}`;
  }
  const m = text.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}):(\d{2})/);
  if (m) return `${m[1]}T${String(Number(m[2])).padStart(2, "0")}:${m[3]}`;
  return "";
}
function fromDatetimeLocal(value) {
  if (!value) return "";
  return formatDateTime12(String(value).replace("T", " "));
}
function deviceModel() {
  const ua = navigator.userAgent || "";
  const android = ua.match(/;\s*([^;)]+?)\s+Build\//i);
  if (/Android/i.test(ua) && android) {
    const name = android[1].replace(/_/g, " ").trim();
    if (name && !/^wv$/i.test(name) && !/Linux/i.test(name)) return name;
  }
  if (/Android/i.test(ua)) return "Android 手機";
  if (/iPhone/i.test(ua)) {
    const ios = ua.match(/OS (\d+)[._](\d+)/);
    return "iPhone" + (ios ? " iOS " + ios[1] + "." + ios[2] : "");
  }
  if (/iPad/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    const ios = ua.match(/OS (\d+)[._](\d+)/);
    return "iPad" + (ios ? " iPadOS " + ios[1] + "." + ios[2] : "");
  }
  if (/Windows NT/i.test(ua)) return "Windows 電腦";
  if (/Mac OS X/i.test(ua)) return "Mac 電腦";
  if (/Linux/i.test(ua)) return "電腦";
  return "未知型號";
}
function deviceInfo() {
  const ua = navigator.userAgent || "";
  let os = "未知裝置";
  if (/iPad/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) os = "iPad";
  else if (/iPhone|iPod/i.test(ua)) os = "iPhone";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Windows/i.test(ua)) os = "Windows 電腦";
  else if (/Mac OS X/i.test(ua)) os = "Mac 電腦";
  else if (/Linux/i.test(ua)) os = "電腦";
  let browser = "瀏覽器";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  const mode = isStandalone() ? "已安裝 App" : "網頁";
  return os + " · " + browser + " · " + mode;
}
async function refreshGeo() {
  if (ui.geoAddr) return ui.geoAddr;
  if (ui.geoTried) return ui.geoAddr || "";
  ui.geoTried = true;
  const ip = await lookupIpFix();
  if (ip && ip.ip) ui.geoIp = ip.ip;
  let addr = "";
  if (ip && isFinite(ip.lat) && isFinite(ip.lon)) addr = await reverseTwAddr(ip.lat, ip.lon);
  if (!addr && ip) addr = fmtTwAddr({
    country: ip.country,
    country_code: ip.country_code,
    city: ip.city,
    county: ip.region,
    suburb: ip.district || ""
  });
  if (addr) {
    ui.geoAddr = addr;
    backfillAuditAddress(addr);
  }
  return ui.geoAddr || "";
}
function skyFromCode(code) {
  const c = Number(code);
  if (c >= 95) return "storm";
  if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82) || (c >= 71 && c <= 77) || (c >= 85 && c <= 86)) return "rain";
  if (c === 0 || c === 1) return "sun";
  return "cloud";
}
function skyLabel(sky) {
  return { sun: "晴天", cloud: "陰天", rain: "雨天", storm: "大雷雨" }[sky] || "陰天";
}
function skyFxHtml(sky) {
  const s = sky || "cloud";
  if (s === "sun") {
    return `<span class="sun-ball"></span><span class="sun-rays"></span>${[0,1,2,3,4,5].map(i => `<span class="spark" style="--i:${i}"></span>`).join("")}`;
  }
  if (s === "cloud") {
    return `<span class="cld a"></span><span class="cld b"></span><span class="cld c"></span><span class="cld d"></span>`;
  }
  const n = s === "storm" ? 40 : 30;
  const drops = Array.from({ length: n }, (_, i) => {
    const left = (i * 37) % 100;
    return `<span class="drop" style="left:${left}%;height:${12 + (i % 7) * 2}px"></span>`;
  }).join("");
  return drops + (s === "storm" ? `<span class="flash"></span><span class="bolt"></span>` : "");
}
let skyLive = null, skyRaf = 0, skyKind = "", skyT0 = 0;
function ensureSkyLive() {
  if (skyLive) return skyLive;
  skyLive = document.createElement("div");
  skyLive.id = "sky-live";
  skyLive.className = "sky-fx sky-live";
  skyLive.setAttribute("aria-hidden", "true");
  document.body.appendChild(skyLive);
  return skyLive;
}
function attachSkyLive() {
  const hero = document.querySelector(".weather-hero");
  const el = ensureSkyLive();
  const sky = ui.sky || "cloud";
  if (hero) {
    hero.setAttribute("data-sky", sky);
    if (el.parentNode !== hero) hero.insertBefore(el, hero.firstChild);
    el.style.display = "";
  } else {
    if (el.parentNode !== document.body) document.body.appendChild(el);
    el.style.display = "none";
  }
  if (skyKind !== sky) {
    skyKind = sky;
    el.innerHTML = skyFxHtml(sky);
    skyT0 = performance.now();
  }
  if (!skyRaf) skyRaf = requestAnimationFrame(tickSky);
}
function tickSky(now) {
  skyRaf = requestAnimationFrame(tickSky);
  if (!skyLive || skyLive.style.display === "none") return;
  const t = (now - (skyT0 || now)) / 1000;
  const h = skyLive.clientHeight || 118;
  const kids = skyLive.children;
  for (let i = 0; i < kids.length; i++) {
    const n = kids[i];
    if (n.classList.contains("drop")) {
      const spd = (skyKind === "storm" ? 180 : 110) + (i % 7) * 18;
      n.style.transform = "translateY(" + (((t * spd) + i * 17) % (h + 40) - 24) + "px) rotate(14deg)";
    } else if (n.classList.contains("cld")) {
      n.style.transform = "translateX(" + (((t * (8 + i * 3)) + i * 40) % 160 - 40) + "%)";
    } else if (n.classList.contains("sun-rays")) {
      n.style.transform = "rotate(" + (t * 24) + "deg)";
    } else if (n.classList.contains("sun-ball")) {
      n.style.transform = "scale(" + (1 + Math.sin(t * 2.2) * 0.08) + ")";
    } else if (n.classList.contains("spark")) {
      const p = (t * 0.7 + i * 0.18) % 1;
      n.style.opacity = p < 0.7 ? String(1 - p) : "0";
      n.style.transform = "translate(" + (-46 * p) + "px," + (-36 * p) + "px) scale(" + (0.3 + p) + ")";
    } else if (n.classList.contains("flash")) {
      const cycle = t % 3.6;
      n.style.background = (cycle > 3.1 && cycle < 3.25) ? "rgba(255,255,255,.55)" : "transparent";
    } else if (n.classList.contains("bolt")) {
      const cycle = t % 3.6;
      n.style.opacity = (cycle > 3.1 && cycle < 3.22) ? "1" : "0";
    }
  }
}
function applySkyDom() {
  attachSkyLive();
}
async function refreshSky(force) {
  const now = Date.now();
  if (!force && ui.skyAt && now - ui.skyAt < 15 * 60 * 1000 && ui.sky) {
    applySkyDom();
    return ui.sky;
  }
  try {
    const data = await fetchJson("https://api.open-meteo.com/v1/forecast?latitude=22.6438&longitude=120.3732&current=weather_code&timezone=Asia%2FTaipei");
    const code = data && data.current && data.current.weather_code;
    ui.sky = skyFromCode(code);
    ui.skyAt = now;
  } catch {
    if (!ui.sky) ui.sky = "cloud";
  }
  applySkyDom();
  return ui.sky;
}
async function fetchJson(url) {
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), 3500) : 0;
  try {
    const res = await fetch(url, { signal: ctrl ? ctrl.signal : undefined });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
  finally { if (timer) clearTimeout(timer); }
}
async function lookupIpFix() {
  const list = [
    ["https://ipwho.is/", d => d && d.success !== false ? { lat: Number(d.latitude), lon: Number(d.longitude), country: d.country, country_code: d.country_code, region: d.region, city: d.city, ip: d.ip } : null],
    ["https://ipapi.co/json/", d => d && !d.error ? { lat: Number(d.latitude), lon: Number(d.longitude), country: d.country_name, country_code: d.country, region: d.region, city: d.city, ip: d.ip } : null],
    ["https://ipinfo.io/json", d => {
      const loc = String((d && d.loc) || "").split(",");
      return { lat: Number(loc[0]), lon: Number(loc[1]), country: d.country, country_code: d.country, region: d.region, city: d.city, ip: d.ip };
    }]
  ];
  for (const [url, parse] of list) {
    const d = await fetchJson(url);
    if (!d) continue;
    const p = parse(d);
    if (p && isFinite(p.lat) && isFinite(p.lon)) return p;
  }
  return null;
}
async function reverseTwAddr(lat, lon) {
  const d = await fetchJson("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + lon + "&zoom=16&addressdetails=1&accept-language=zh-TW");
  if (!d || !d.address) return "";
  return fmtTwAddr(d.address);
}
function pickZh(s) {
  const raw = String(s || "").trim();
  if (!raw) return "";
  const parts = raw.split(/[;/｜|]/).map(x => x.trim()).filter(Boolean);
  const cjk = parts.find(x => /[\u4e00-\u9fff]/.test(x));
  let out = cjk || parts[0] || "";
  const cityMap = {
    "New Taipei": "新北市", Kaohsiung: "高雄市", Taipei: "台北市", Taichung: "台中市",
    Tainan: "台南市", Taoyuan: "桃園市", Hsinchu: "新竹市", Keelung: "基隆市",
    Chiayi: "嘉義", Hualien: "花蓮", Taitung: "台東", Pingtung: "屏東縣",
    Yilan: "宜蘭", Miaoli: "苗栗", Changhua: "彰化", Nantou: "南投",
    Yunlin: "雲林", Penghu: "澎湖", Kinmen: "金門", Lienchiang: "連江"
  };
  const hit = Object.keys(cityMap).find(x => out.indexOf(x) >= 0);
  if (hit) out = cityMap[hit];
  return out.replace(/臺/g, "台").replace(/ City$/i, "市").replace(/ County$/i, "縣");
}
function fmtTwAddr(a) {
  if (!a) return "";
  const cc = String(a.country_code || a.country || "");
  const isTw = /台灣|臺灣|Taiwan|^tw$/i.test(cc);
  const city = pickZh(a.city || a.county || a.state || a.region || "");
  const dist = pickZh(a.suburb || a.city_district || a.district || a.town || a.municipality || a.village || "");
  if (isTw) {
    const parts = ["台灣"];
    if (city) parts.push(city);
    if (dist && dist !== city) parts.push(dist);
    return parts.join(" ");
  }
  const country = pickZh(a.country) || pickZh(cc);
  const parts = [country, city, dist].filter((p, i, arr) => p && arr.indexOf(p) === i);
  return parts.join(" ");
}
function backfillAuditAddress(addr) {
  if (!addr || !state.auditLogs) return;
  let n = 0;
  const mine = deviceInfo();
  state.auditLogs.forEach(x => {
    if (x && !x.address && x.device === mine) { x.address = addr; n++; }
  });
  if (n) try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}
function pageLabel() {
  const p = ui.role === "admin" && (ui.page === "home" || !ui.page) ? "dash" : (ui.page || "home");
  const map = {
    home: "首頁", rooms: ui.role === "admin" ? "所有資產" : "房間",
    "room-detail": "房間詳情", parking: "停車位", balcony: "公共陽台", trash: "子母車",
    lease: "租約", repair: "報修", "repair-done": "報修", pay: "繳費租金",
    dash: "總覽", "room-edit": "編輯房間／租客資料", invoice: "發票",
    tenants: "租客", announce: "公告", repairs: "報修", ai: "工作助手", logs: "日誌",
    "tenant-login": "租客登入", "admin-login": "管理員登入",
    "tenant-setpass": "設定登入密碼", "tenant-forgot": "忘記密碼"
  };
  return map[p] || p;
}
function actorLabel() {
  if (ui.role === "admin") {
    const name = ui.adminCode === "1240" ? "開發者" : "管理員";
    return `${name}（密碼 ${ui.adminCode || "未知"}）`;
  }
  if (ui.role === "tenant") {
    const room = typeof myRoom === "function" ? myRoom() : null;
    const t = typeof me === "function" ? me() : null;
    const no = (room && room.no) || ui.roomNo || "";
    const name = t && t.name ? t.name : "未填姓名";
    return `租客 ${no}　${name}`;
  }
  return "未登入";
}
function logKind(x) {
  if (!x) return "admin";
  if (x.kind === "dev" || x.kind === "developer") return "dev";
  if (/開發者|密碼 1240/.test(String(x.who || ""))) return "dev";
  if (x.kind === "tenant") return "tenant";
  return "admin";
}
let lastAuditBrowse = "";
function audit(action, detail) {
  try {
    if (isDevPreview()) return;
    if (!state.auditLogs) state.auditLogs = [];
    const page = pageLabel();
    const key = [ui.role, ui.tenantId || ui.adminCode || "", action, detail || "", page].join("|");
    if (action === "瀏覽" && key === lastAuditBrowse) return;
    if (action === "瀏覽") lastAuditBrowse = key;
    state.auditLogs.push({
      id: "log" + Date.now().toString(36) + Math.random().toString(16).slice(2, 6),
      at: nowStamp(),
      kind: ui.role === "admin" && ui.adminCode === "1240" ? "dev" : (ui.role || "guest"),
      who: actorLabel(),
      action,
      detail: detail || "",
      page,
      device: deviceInfo(),
      model: deviceModel(),
      address: ui.geoAddr || ""
    });
    if (state.auditLogs.length > 500) state.auditLogs = state.auditLogs.slice(-500);
    save();
  } catch {}
}
function maybeAuditBrowse() {
  if (!ui.role) return;
  audit("瀏覽", pageLabel());
}
function daysLeft(end) {
  if (!end) return null;
  const n = Math.ceil((new Date(end + "T00:00:00") - TODAY) / 86400000);
  return Number.isFinite(n) ? n : null;
}
function leaseLeftText(end) {
  const n = daysLeft(end);
  if (n == null) return "—";
  return n < 0 ? "已到期" : n + " 天";
}
function rentOverdueDays() {
  const due = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  return Math.max(0, Math.floor((TODAY - due) / 86400000));
}
function money(n) { return "NT$ " + Number(n).toLocaleString("zh-TW"); }
function rocDate(d) {
  d = d || new Date();
  return `中華民國 ${d.getFullYear() - 1911} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
function moneyCN(n) {
  n = Math.round(Math.abs(Number(n) || 0));
  if (!n) return "新臺幣零元整";
  const num = "零壹貳參肆伍陸柒捌玖";
  const units = ["仟", "佰", "拾", ""];
  function four(x) {
    const s4 = String(x).padStart(4, "0");
    let out = "";
    for (let i = 0; i < 4; i++) {
      const v = +s4[i];
      if (v) out += num[v] + units[i];
      else if (out && !out.endsWith("零") && /[1-9]/.test(s4.slice(i))) out += "零";
    }
    return out;
  }
  const yi = Math.floor(n / 1e8);
  const wan = Math.floor((n % 1e8) / 1e4);
  const rest = n % 10000;
  let s = "";
  if (yi) s += four(yi) + "億";
  if (wan) {
    if (yi && wan < 1000) s += "零";
    s += four(wan) + "萬";
  } else if (yi && rest) s += "零";
  if (rest) {
    if ((yi || wan) && rest < 1000) s += "零";
    s += four(rest);
  }
  return "新臺幣" + s + "元整";
}
function invoiceBuyer(r, t) {
  if (r.kind === "factory") return (t && t.name) || r.company || r.manager || "";
  return (t && t.name) || "";
}
function invoiceAddr(r, t) {
  const raw = (t && t.address) || r.location || (r.kind === "factory" ? "" : roomAddress(r.no)) || "";
  const m = String(raw).match(/^(.*?[市縣])\s*(.*?[區鄉鎮市])\s*(.*?)(\d+)\s*號(?:(\d+)\s*樓)?(?:-(\d+)\s*室)?/);
  if (!m) return { city: "", dist: "", road: raw, no: "", floor: "", room: "", lane: "", alley: "" };
  return { city: m[1] || "", dist: m[2] || "", road: (m[3] || "").trim(), no: m[4] || "", floor: m[5] || "", room: m[6] || "", lane: "", alley: "" };
}
function rocYearCn(y) {
  return String(y).split("").map(ch => "○一二三四五六七八九"[Number(ch)] || ch).join("");
}
function invoicePeriod(d) {
  d = d || new Date();
  const y = d.getFullYear() - 1911;
  const m = d.getMonth() + 1;
  const start = m % 2 === 0 ? m - 1 : m;
  const end = start + 1;
  const cn = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  return {
    y, m, day: d.getDate(), start, end,
    period: `${rocYearCn(y)}年${cn[start]}、${cn[end]}月份`,
    dateLine: `中華民國 ${y} 年　${m}　月　${d.getDate()}　日`
  };
}
function moneyCnBoxes(n) {
  n = Math.round(Math.abs(Number(n) || 0));
  const digits = String(n).padStart(9, "0").slice(-9).split("");
  const han = "零壹貳參肆伍陸柒捌玖";
  const labels = ["億", "仟", "佰", "拾", "萬", "仟", "佰", "拾", "元"];
  let started = false;
  return digits.map((d, i) => {
    const v = Number(d);
    if (v) started = true;
    const ch = !started && i < 8 ? "" : han[v];
    if (v) started = true;
    return `<span class="inv-box"><em>${labels[i]}</em><b>${ch}</b></span>`;
  }).join("");
}
function invoiceCopyHtml(r, t, copyName) {
  const amt = Number(r.rent) || 0;
  const month = (new Date()).getMonth() + 1;
  const triple = r.kind === "factory";
  const p = invoicePeriod();
  const addr = invoiceAddr(r, t);
  const buyer = invoiceBuyer(r, t);
  const track = (ui.invoiceTrack || "").toUpperCase();
  const num = ui.invoiceNum || "";
  const blank = `<tr><td></td><td></td><td></td><td></td><td></td></tr>`;
  return `<section class="inv-paper">
    <div class="inv-head">
      <div class="inv-no">
        <span class="inv-track">${escapeHtml(track || "　")}</span>
        <span class="inv-digits">${escapeHtml(num || "　　　　　　")}</span>
      </div>
      <div class="inv-title">
        <div class="inv-main-title">統一發票${triple ? "(三聯式)" : "(二聯式)"}</div>
        <div class="inv-period">－ ${p.period} －</div>
        <div class="inv-date">${p.dateLine}</div>
      </div>
    </div>
    <div class="inv-buyer">
      <div class="inv-line"><span>買 受 人：</span><b>${escapeHtml(buyer)}</b></div>
      ${t && t.taxId ? `<div class="inv-line"><span>統一編號：</span><b>${escapeHtml(t.taxId)}</b></div>` : ""}
      <div class="inv-addr">
        <span>地　　址：</span>
        <b>${escapeHtml(addr.city)}</b><i>縣市</i>
        <b>${escapeHtml(addr.dist)}</b><i>鄉鎮市區</i>
        <b>${escapeHtml(addr.road)}</b><i>路街</i>
        <b></b><i>段</i>
        <b></b><i>巷</i>
        <b></b><i>弄</i>
        <b>${escapeHtml(addr.no)}</b><i>號</i>
        <b>${escapeHtml(addr.floor)}</b><i>樓</i>
        <b>${escapeHtml(addr.room)}</b><i>室</i>
      </div>
    </div>
    <div class="inv-grid">
      <div class="inv-items-wrap">
      <table class="inv-items">
        <thead>
          <tr>
            <th class="c-name">品　　名</th>
            <th class="c-qty">數 量</th>
            <th class="c-price">單 價</th>
            <th class="c-amt">金　　額</th>
            <th class="c-note">備　　註</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${month}月租金收入</td>
            <td>一式</td>
            <td>${amt.toLocaleString("zh-TW")}</td>
            <td>${amt.toLocaleString("zh-TW")}</td>
            <td>${escapeHtml(r.no)}</td>
          </tr>
          ${blank}${blank}${blank}${blank}
          <tr class="inv-total-row">
            <td colspan="2">總　　計</td>
            <td></td>
            <td>${amt.toLocaleString("zh-TW")}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="inv-stamp">營業人蓋用統一發票專用章
        <div class="inv-chop">
          <strong>統潔＆信潔開發有限公司</strong>
          <span>82934388</span>
          <em>高雄市鳳山區北興街100號1樓</em>
        </div>
      </div>
    </div>
    <div class="inv-cnrow">
      <span class="inv-cnlab">總計新臺幣<br>（中文大寫）</span>
      <div class="inv-boxes">${moneyCnBoxes(amt)}</div>
    </div>
    <div class="inv-taxrow">
      <span>課 稅 別</span>
      <label class="on">應 稅 √</label>
      <label>零稅率</label>
      <label>免 稅</label>
    </div>
    <div class="inv-bottom">
      <span>※應稅、零稅率、免稅之銷售額應分別開立統一發票，並應於各該欄打「√」。</span>
      <b>${copyName}</b>
    </div>
  </section>`;
}
function adminInvoice() {
  const r = state.rooms.find(x => x.id === ui.invoiceRoomId);
  if (!r) return `<div class="empty">找不到房間</div>`;
  const t = state.tenants.find(x => x.roomId === r.id || x.id === r.tenantId);
  const triple = r.kind === "factory";
  const copies = triple ? ["第一聯 存根聯", "第二聯 扣抵聯", "第三聯 收執聯"] : ["第一聯 存根聯", "第二聯 收執聯"];
  const back = ui.invoiceFrom === "room-edit" ? "room-edit" : "tenants";
  return `<div class="admin-grid list invoice-page">
    <div class="card card-body no-print">
      <button class="back" type="button" data-admin="${back}">← 返回</button>
      <h2 class="dash-h">${r.no}　${triple ? "三聯式統一發票" : "二聯式統一發票"}</h2>
      <p class="small">排版依財政部手開${triple ? "三" : "二"}聯式收執聯。請填入手開發票本字軌與號碼後列印。</p>
      <div class="inv-inputs">
        <label class="field"><span>字軌（2 碼）</span><input id="inv-track" type="text" maxlength="2" value="${escapeHtml(ui.invoiceTrack || "")}" placeholder="例如 TP" /></label>
        <label class="field"><span>號碼（8 碼）</span><input id="inv-num" type="text" maxlength="8" value="${escapeHtml(ui.invoiceNum || "")}" placeholder="例如 21751800" /></label>
      </div>
      <button type="button" class="btn-navy" id="print-invoice" style="margin-top:8px">列印發票</button>
    </div>
    ${copies.map(c => invoiceCopyHtml(r, t, c)).join("")}
  </div>`;
}
function statusLabel(s) { return { rented: "滿租", vacant: "空置", repair: "維修中", office: "辦公室" }[s] || s; }
function payLabel(tenant) {
  if (!tenant) return { text: "—", cls: "paid" };
  return tenant.paid ? { text: "本月已繳", cls: "paid" } : { text: "本月未繳", cls: "unpaid" };
}
function payOverdueNudge(tenant) {
  if (!tenant || tenant.paid) return false;
  const due = Number(tenant.dueDay || 5) || 5;
  const day = new Date().getDate();
  return day >= due - 3;
}
function floorNo(no) {
  const s = String(no).replace(/\D/g, "");
  if (s.length < 2) return 0;
  return Number(s.charAt(s.length - 2));
}
function roomsByFloor() {
  return [...state.rooms].sort((a, b) => floorNo(a.no) - floorNo(b.no) || a.no.localeCompare(b.no, "zh-Hant"));
}
function isDevPreview() { return !!(ui.devPreview && ui.role === "tenant"); }
function ensureDevPreview() {
  const sample = (state.rooms || []).find(r => r.kind !== "factory" && r.status !== "office") || {};
  const y = new Date().getFullYear();
  const photos = ["images/living.jpg", "images/kitchen.jpg", "images/bedroom.jpg", "images/bath.jpg"];
  ui.devRoom = {
    id: "r-dev-preview",
    no: "DEMO",
    title: "套房",
    kind: "studio",
    status: "rented",
    rent: 10000,
    deposit: 10000,
    location: "高雄市鳳山區文龍東路68號2樓-1室",
    note: "開發者測試房間（不計入金額）",
    tenantId: "t-dev-preview",
    amenities: AMENITIES.slice(),
    photos: photos,
    utilities: { electric: "5樓設有自助儲值機可以刷卡儲值", water: "一年固定 $1,800" },
    contractImages: []
  };
  ui.devTenant = Object.assign({
    id: "t-dev-preview",
    name: "開發者",
    roomId: "r-dev-preview",
    paid: false,
    leaseStart: y + "-01-01",
    leaseEnd: (y + 1) + "-12-31",
    dueDay: 5,
    phone: "0912-345-678",
    loginPass: ""
  }, ui.devTenant && ui.devTenant.id === "t-dev-preview" ? { avatar: ui.devTenant.avatar, paid: ui.devTenant.paid, paidVia: ui.devTenant.paidVia, paidAt: ui.devTenant.paidAt } : {});
  if (!ui.devRepairs) ui.devRepairs = [];
  if (!ui.devRenewals) ui.devRenewals = [];
  if (!ui.devReactions) ui.devReactions = {};
  if (!ui.devReadAnns) ui.devReadAnns = {};
}
function enterDevPreview() {
  ui.devPreview = true;
  ui.adminCode = "1240";
  ensureDevPreview();
  ui.role = "tenant";
  ui.tenantId = ui.devTenant.id;
  ui.roomId = ui.devRoom.id;
  ui.roomNo = ui.devRoom.no;
  ui.page = "home";
  persistUi();
  render();
}
function exitDevPreview() {
  ui.devPreview = false;
  ui.role = "admin";
  ui.adminCode = "1240";
  ui.page = "dash";
  ui.tenantId = null;
  ui.roomId = null;
  ui.roomNo = "";
  persistUi();
  beatPresence();
  render();
}
function me() {
  if (isDevPreview()) { ensureDevPreview(); return ui.devTenant; }
  return state.tenants.find(t => t.id === ui.tenantId);
}
function myRoom() {
  if (isDevPreview()) { ensureDevPreview(); return ui.devRoom; }
  const t = me();
  return t ? state.rooms.find(r => r.id === t.roomId) : null;
}
function unreadAnnouncements(tenantId) {
  return (state.announcements || []).filter(a => !(a.readBy || []).includes(tenantId));
}
function unreadRenewTimes(tenantId) {
  return (state.renewals || []).filter(x => x.tenantId === tenantId && x.appointAt && !x.appointRead && x.status !== "done").length;
}
function unreadAppoints(tenantId) {
  return (state.repairs || []).filter(r => r.tenantId === tenantId && r.appointAt && !r.appointRead).length;
}

let toastTimer = 0;
function showToastBanner(msg) {
  const app = document.getElementById("app");
  if (!app) return;
  let el = app.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    app.insertBefore(el, app.firstChild);
  }
  el.textContent = String(msg || "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    ui.toast = "";
    const n = document.querySelector(".toast");
    if (n) n.remove();
  }, 1800);
}
function formVal(form, name) {
  const el = form && form.elements && form.elements.namedItem(name);
  if (!el) return "";
  return String(el.value || "");
}
function toast(msg) {
  ui.toast = msg;
  if (ui.role && msg && /^(已|登錄成功)/.test(String(msg))) audit("操作", String(msg));
  if (ui.role === "tenant") {
    showToastBanner(msg);
    return;
  }
  ui.keepScroll = true;
  render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    ui.toast = "";
    const n = document.querySelector(".toast");
    if (n) n.remove();
  }, 1800);
}
function sendRemoteNotify(target, title, body) {
  fetch(LINE_HOOK + "/api/push", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Tongjie-Key": SYNC_KEY },
    body: JSON.stringify({ target: target || "all", title, body })
  }).catch(() => {});
}
function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent); }
function isAndroid() { return /android/i.test(navigator.userAgent); }
function isStandalone() {
  if (window.navigator.standalone === true) return true;
  if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
  if (window.matchMedia && window.matchMedia("(display-mode: fullscreen)").matches) return true;
  return false;
}
function notifyStatus() {
  if (isIOS() && !isStandalone()) return "need-install";
  if (!("Notification" in window) || typeof Notification.requestPermission !== "function") return "unsupported";
  return Notification.permission || "default";
}
function notifySnoozed() {
  try { return sessionStorage.getItem("tj-notify-snooze") === "1"; } catch { return false; }
}
function snoozeNotifyGuide() {
  try { sessionStorage.setItem("tj-notify-snooze", "1"); } catch {}
  ui.notifyGuide = false;
}
function needsNotifyGuide() {
  if (!isInstalledApp()) return false;
  if (ui.notifyGuide === true) return true;
  if (notifySnoozed() && ui.notifyGuide !== true) return false;
  const st = notifyStatus();
  return st === "default" || st === "denied" || st === "unsupported";
}
function notifyOsSteps() {
  if (isIOS()) return [
    "1. 請從主畫面圖示打開這個 App（不要從 Safari 開）。",
    "2. 點下方「開啟通知」，在系統視窗選允許。",
    "3. 若沒跳出：設定 → 通知 → 統潔開發 → 允許通知。"
  ];
  if (isAndroid()) return [
    "1. 點下方「開啟通知」，在系統視窗選允許。",
    "2. 若沒跳出：設定 → 應用程式 → 統潔開發 → 通知 → 允許。",
    "3. 請用 Chrome 安裝的圖示打開，不要用網頁分頁。"
  ];
  return [
    "1. 點下方「開啟通知」，在瀏覽器視窗選允許。",
    "2. 若被擋住：點網址列左側鎖頭 → 通知 → 允許。",
    "3. 請從開始功能表或 Dock 打開已安裝的 App。"
  ];
}
function notifyGuideHtml() {
  if (!needsNotifyGuide()) return notifyChipHtml();
  const st = notifyStatus();
  const title = st === "denied" ? "通知被關閉" : st === "unsupported" ? "這台裝置暫不支援通知" : "開啟手機通知";
  const lead = st === "denied"
    ? "系統目前擋住通知，請依步驟打開，之後公告、報修、繳費才會在螢幕上方跳出。"
    : st === "unsupported"
      ? (isIOS() ? "請將 iOS 更新到 16.4 以上，並用「加入主畫面」後的圖示打開。" : "請改用 Chrome 或 Edge 安裝後再開啟通知。")
      : "安裝後請允許通知。公告、未繳租金、報修與續約會像一般 App 一樣從螢幕上方跳出。";
  const steps = notifyOsSteps().map(s => `<p>${s}</p>`).join("");
  const allow = st === "unsupported" ? "" : `<button class="btn-navy" id="notify-allow" type="button">${st === "denied" ? "再試一次" : "開啟通知"}</button>`;
  return `<div class="install-mask" id="notify-mask">
    <div class="install-sheet">
      <div class="label">NOTIFICATIONS</div>
      <h2>${title}</h2>
      <p class="small">${lead}</p>
      <div class="notify-steps">${steps}</div>
      ${allow}
      <button class="ghost" id="notify-later" type="button">稍後</button>
    </div>
  </div>`;
}
function notifyChipHtml() {
  if (!isInstalledApp() || needsNotifyGuide()) return "";
  const st = notifyStatus();
  if (st === "granted") return "";
  if (st === "need-install") return "";
  return `<button type="button" class="notify-chip" id="open-notify-guide">尚未開啟通知，點此設定</button>`;
}
function bindNotifyGuide() {
  const later = () => { snoozeNotifyGuide(); render(); };
  const mask = document.getElementById("notify-mask");
  if (mask) mask.onclick = e => { if (e.target.id === "notify-mask") later(); };
  const laterBtn = document.getElementById("notify-later");
  if (laterBtn) laterBtn.onclick = later;
  const allow = document.getElementById("notify-allow");
  if (allow) allow.onclick = async () => {
    const ok = await enablePush(true);
    if (ok) {
      try { sessionStorage.removeItem("tj-notify-snooze"); } catch {}
      ui.notifyGuide = false;
      toast("通知已開啟");
      showOsBanner("統潔開發", "通知已開啟，之後重要訊息會顯示在螢幕上方", "notify-on");
      render();
      maybeNudgeNotifies();
    } else if (notifyStatus() === "denied") {
      ui.notifyGuide = true;
      toast(isIOS() ? "請到設定 → 通知 → 統潔開發，打開允許" : "請到設定 → 應用程式 → 統潔開發 → 通知，改為允許");
      render();
    } else {
      toast("沒有跳出系統視窗，請再點一次「開啟通知」");
    }
  };
  const chip = document.getElementById("open-notify-guide");
  if (chip) chip.onclick = () => { ui.notifyGuide = true; try { sessionStorage.removeItem("tj-notify-snooze"); } catch {}; render(); };
}
function subscribePushOnly() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  navigator.serviceWorker.ready.then(async reg => {
    try {
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC)
        });
      }
      const room = ui.role === "tenant" ? myRoom() : null;
      await fetch(LINE_HOOK + "/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Tongjie-Key": SYNC_KEY },
        body: JSON.stringify({
          subscription: sub.toJSON(),
          role: ui.role || "",
          roomNo: room ? room.no : (ui.role === "admin" ? "7651" : ""),
          tenantId: ui.tenantId || ""
        })
      });
    } catch {}
  });
}
async function enablePush(forceAsk) {
  if (!isInstalledApp() && !forceAsk) return false;
  if (!("Notification" in window) || typeof Notification.requestPermission !== "function") return false;
  if (Notification.permission === "denied") return false;
  if (isIOS() && !isStandalone()) return false;
  if (Notification.permission !== "granted") {
    try {
      const p = await Notification.requestPermission();
      if (p !== "granted") return false;
    } catch { return false; }
  }
  subscribePushOnly();
  return true;
}
function armPushAsk() {
  if (!ui.role || !isInstalledApp()) return;
  if (notifyStatus() === "granted") {
    subscribePushOnly();
    maybeNudgeNotifies();
    return;
  }
  if (needsNotifyGuide()) return;
  const go = e => {
    if (e && e.target && e.target.closest("input, textarea, select, button, a, label, canvas, .field, .upload")) {
      document.addEventListener("pointerdown", go, { once: true, capture: true });
      return;
    }
    enablePush().then(ok => { if (ok) maybeNudgeNotifies(); });
  };
  document.addEventListener("pointerdown", go, { once: true, capture: true });
  document.addEventListener("keydown", go, { once: true, capture: true });
}
function shouldShowLocalBanner(target) {
  if (!target || target === "all") return true;
  if (target === "admin") return ui.role === "admin";
  if (target === "tenants") return ui.role === "tenant";
  const room = myRoom();
  return !!(ui.role === "tenant" && room && String(room.no) === String(target));
}
function canOsNotify() {
  if (!isInstalledApp()) return false;
  if (!("Notification" in window)) return false;
  return Notification.permission === "granted";
}
function showOsBanner(title, body, tag) {
  if (!canOsNotify()) return;
  const text = String(body || "").slice(0, 180);
  const opts = {
    body: text,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    lang: "zh-Hant",
    vibrate: [200, 80, 200],
    tag: tag || ("tongjie-" + title),
    renotify: true,
    silent: false
  };
  const viaSw = () => navigator.serviceWorker.ready.then(reg => reg.showNotification(title, opts));
  const viaPage = () => { try { const n = new Notification(title, opts); n.onclick = () => { window.focus(); n.close(); }; } catch {} };
  if (navigator.serviceWorker) viaSw().catch(viaPage);
  else viaPage();
}
function pushPhoneNotify(title, body, target) {
  if (isDevPreview()) return;
  const text = body || "";
  if (target) sendRemoteNotify(target, title, text);
  if (!shouldShowLocalBanner(target)) return;
  const show = () => showOsBanner(title, text);
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") { show(); return; }
  if (Notification.permission !== "denied" && !(isIOS() && !isStandalone())) {
    Notification.requestPermission().then(p => { if (p === "granted") { subscribePushOnly(); show(); } });
  }
}
function nudgeKey(id) { return "tj-nudge-" + id; }
function alreadyNudged(id) {
  try { return localStorage.getItem(nudgeKey(id)) === todayStamp(); } catch { return true; }
}
function markNudged(id) {
  try { localStorage.setItem(nudgeKey(id), todayStamp()); } catch {}
}
function todayStamp() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function maybeNudgeNotifies() {
  if (!canOsNotify()) return;
  if (ui.role === "tenant" && ui.tenantId) {
    const t = me();
    const room = myRoom();
    const unread = unreadAnnouncements(ui.tenantId);
    if (unread.length) {
      const a = unread[unread.length - 1];
      if (!alreadyNudged("ann-" + a.id)) {
        markNudged("ann-" + a.id);
        showOsBanner("管理員公告", a.title + (a.body ? "\n" + a.body : ""), "ann-" + a.id);
      }
    }
    if (t && t.paid === false && !alreadyNudged("unpaid-" + t.id)) {
      markNudged("unpaid-" + t.id);
      showOsBanner("本月租金尚未繳納", (room ? room.no + "　" : "") + "請至繳費租金完成轉帳。", "unpaid");
    }
    if (t && t.leaseEnd) {
      const left = Math.ceil((new Date(t.leaseEnd + "T00:00:00") - new Date()) / 86400000);
      if (left >= 0 && left <= 30 && !alreadyNudged("lease-" + t.id)) {
        markNudged("lease-" + t.id);
        showOsBanner("合約即將到期", `將於 ${t.leaseEnd} 到期，還有 ${left} 天，建議確認是否續約。`, "lease");
      }
    }
  }
  if (ui.role === "admin") {
    const unpaid = (state.tenants || []).filter(t => t.paid === false && (t.name || "").trim());
    if (unpaid.length && !alreadyNudged("admin-unpaid")) {
      markNudged("admin-unpaid");
      showOsBanner("本月未繳租金", unpaid.length + " 戶尚未繳費", "admin-unpaid");
    }
  }
}
function notifyCloudChanges(before) {
  if (!before || !canOsNotify()) return;
  const newAnns = (state.announcements || []).filter(a => !(before.anns || []).includes(a.id));
  if (ui.role === "tenant" && newAnns.length) {
    const a = newAnns[newAnns.length - 1];
    showOsBanner("管理員公告", a.title + (a.body ? "\n" + a.body : ""), "ann-" + a.id);
  }
  if (ui.role === "admin") {
    (state.repairs || []).filter(r => !(before.repairIds || []).includes(r.id)).forEach(r => {
      showOsBanner("新報修", (r.roomNo || "") + " " + (r.type || ""), "repair-" + r.id);
    });
    (state.renewals || []).filter(x => !(before.renewIds || []).includes(x.id)).forEach(x => {
      showOsBanner("續約申請", (x.roomNo || "") + " " + (x.name || ""), "renew-" + x.id);
    });
  }
  if (ui.role === "tenant") {
    (state.repairs || []).filter(r => r.tenantId === ui.tenantId).forEach(r => {
      const old = (before.repairSnap || {})[r.id];
      const now = (r.status || "") + "|" + (r.appointAt || "");
      if (old && old !== now) {
        const msg = r.status === "done" ? "已完成" : r.appointAt ? "已預約維修時間" : "處理中";
        showOsBanner("報修更新", (r.type || "報修") + "　" + msg, "repair-" + r.id);
      }
    });
  }
}

function icon(name) {
  const map = {
    home: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10 10 4l7 6v7H3z"/></svg>',
    room: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="12" height="11" rx="1.5"/><path d="M8 16v-5h4v5"/></svg>',
    lease: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h8v14H6z"/><path d="M8 8h4M8 11h4"/></svg>',
    fix: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    pay: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="14.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    line: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5h16v11H8.5L4 20.5V5.5z"/></svg>',
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.2"/></svg>'
  };
  return map[name];
}

function getRepairMedia(rep) {
  if (!rep) return [];
  if (Array.isArray(rep.media) && rep.media.length) return rep.media;
  if (rep.photo) return [{ kind: "image", src: rep.photo }];
  return [];
}
function repairMediaButtons(rep) {
  const media = getRepairMedia(rep);
  const photos = media.filter(m => m.kind === "image").length;
  const videos = media.filter(m => m.kind === "video").length;
  if (!photos && !videos) return "";
  return `<div class="media-actions">
    ${photos ? `<button type="button" class="ghost" data-view-media="${rep.id}|image">查看照片${photos > 1 ? "（" + photos + "）" : ""}</button>` : ""}
    ${videos ? `<button type="button" class="ghost" data-view-media="${rep.id}|video">查看影片${videos > 1 ? "（" + videos + "）" : ""}</button>` : ""}
  </div>`;
}
function mediaPreviewHtml(list, delAttr) {
  if (!list || !list.length) return "";
  return `<div class="media-preview">${list.map((m, i) => `
    <div class="media-thumb">
      ${m.kind === "video" ? `<video src="${m.src}" muted playsinline></video>` : `<img src="${m.src}" alt="">`}
      <span>${m.kind === "video" ? "影片" : "照片"}</span>
      <button type="button" class="ghost" ${delAttr}="${i}">刪除</button>
    </div>`).join("")}</div>`;
}
function pendingPreviewHtml() { return mediaPreviewHtml(ui.repairMedia, "data-del-pending"); }

function closeContractViewer() { const el = document.getElementById("contract-box"); if (el) el.remove(); }
function closeMediaViewer() {
  const el = document.getElementById("media-box");
  if (el) { el.querySelectorAll("video").forEach(v => { v.pause(); v.src = ""; }); el.remove(); }
}
function openMediaViewer(list, index) {
  closeMediaViewer(); closeContractViewer();
  if (!list.length) return;
  const item = list[index];
  const wrap = document.createElement("div");
  wrap.className = "lightbox"; wrap.id = "media-box";
  wrap.innerHTML = `
    <div class="lightbox-bar"><button type="button" id="lb-close">關閉</button><span>${item.kind === "video" ? "影片" : "照片"} ${index + 1} / ${list.length}</span><span></span></div>
    ${item.kind === "video" ? `<video src="${item.src}" controls autoplay playsinline></video>` : `<img src="${item.src}" alt="">`}
    <div class="lightbox-nav">
      <button type="button" id="lb-prev" ${index === 0 ? "disabled" : ""}>上一則</button>
      <button type="button" id="lb-next" ${index === list.length - 1 ? "disabled" : ""}>下一則</button>
    </div>`;
  (document.querySelector(".shell") || document.body).appendChild(wrap);
  document.getElementById("lb-close").onclick = closeMediaViewer;
  wrap.addEventListener("click", e => { if (e.target === wrap) closeMediaViewer(); });
  document.getElementById("lb-prev").onclick = () => { if (index > 0) openMediaViewer(list, index - 1); };
  document.getElementById("lb-next").onclick = () => { if (index < list.length - 1) openMediaViewer(list, index + 1); };
}
function bindMediaViewers() {
  document.querySelectorAll("[data-view-media]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const [id, kind] = btn.dataset.viewMedia.split("|");
      const rep = state.repairs.find(x => x.id === id);
      const ann = (state.announcements || []).find(x => x.id === id);
      const err = (state.errands || []).find(x => x.id === id);
      const media = rep ? getRepairMedia(rep) : (ann ? (ann.media || []) : (err ? (err.media || []) : []));
      if (ann && ui.tenantId) {
        if (!ann.readBy) ann.readBy = [];
        if (!ann.readBy.includes(ui.tenantId)) { ann.readBy.push(ui.tenantId); save(); }
      }
      openMediaViewer(media.filter(m => m.kind === kind), 0);
    };
  });
}
function bindPendingMedia() {
  document.querySelectorAll("[data-del-pending]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      ui.repairMedia.splice(Number(btn.dataset.delPending), 1);
      const box = document.getElementById("media-preview");
      if (box) box.innerHTML = pendingPreviewHtml();
      bindPendingMedia();
    };
  });
}
function compressImage(file, maxSize) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const max = maxSize || 1400;
      let w = img.width, h = img.height;
      if (w > max) { h = Math.round(h * max / w); w = max; }
      if (h > max) { w = Math.round(w * max / h); h = max; }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", maxSize && maxSize <= 500 ? 0.82 : 0.72));
    };
    img.onerror = reject; img.src = url;
  });
}
function defaultAvatarSvg() {
  return `<svg class="avatar-svg" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#e8e8e8"/><circle cx="32" cy="23.5" r="11.5" fill="#fff"/><path d="M8 58c2-13.5 10.5-19.5 24-19.5S54 44.5 56 58" fill="#fff"/></svg>`;
}
function staffAvatarSvg() {
  return `<svg class="avatar-svg" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#efe8df"/><path d="M17 36c1.2-16 7.5-23 15-23s13.8 7 15 23v4H17z" fill="#5c4338"/><circle cx="32" cy="28" r="11" fill="#f0c8b0"/><path d="M21 28c0-11 5-16 11-16 7 0 12 5.2 12 16" fill="none" stroke="#62765b" stroke-width="3.1" stroke-linecap="round"/><circle cx="18.6" cy="31" r="4.1" fill="#62765b"/><path d="M18.6 35c-1 8 6 12.8 13 12.8" fill="none" stroke="#62765b" stroke-width="2" stroke-linecap="round"/><path d="M12 58c2-11 9-16 20-16s18 5 20 16" fill="#62765b"/><circle cx="28.2" cy="27.2" r="1.15" fill="#7a5346"/><circle cx="35.8" cy="27.2" r="1.15" fill="#7a5346"/><path d="M29 32.4c1.3 1.5 4.7 1.5 6 0" fill="none" stroke="#d09080" stroke-width="1.15" stroke-linecap="round"/></svg>`;
}
function avatarHtml(t, size) {
  const cls = "avatar" + (size === "sm" ? " sm" : "");
  if (t && t.avatar) return `<img class="${cls}" src="${t.avatar}" alt="">`;
  return `<span class="${cls} ph default">${defaultAvatarSvg()}</span>`;
}
function staffAvatarHtml(size, title) {
  const cls = "avatar staff" + (size === "sm" ? " sm" : "");
  const name = title || "管理員";
  const src = name === "開發者" ? "images/dev-avatar.jpg?v=1455" : "images/staff-avatar.jpg?v=1451";
  return `<img class="${cls}" src="${src}" alt="${escapeHtml(name)}" title="${escapeHtml(name)}">`;
}
function readFileDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function contractPdfName(page) {
  const t = me(); const r = myRoom();
  const base = `${(t && t.name) || "租客"} ${(r && r.no) || ""}-租屋合約書`;
  return (page ? `${base}-${page}` : base) + ".pdf";
}
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.style.display = "none";
  document.body.appendChild(a); a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 4000);
}
async function downloadContractsPdf(images, filename) {
  if (!images || !images.length) { toast("尚無合約書圖檔可下載"); return; }
  try {
    const pages = [];
    for (const src of images) {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject; i.src = src;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      pages.push({ dataUrl: canvas.toDataURL("image/jpeg", 0.85), w: img.naturalWidth, h: img.naturalHeight });
    }
    const enc = new TextEncoder();
    const out = []; const off = [0]; let ppos = 0;
    const emit = (str, raw) => { const a = enc.encode(str); out.push(a); ppos += a.length; if (raw) { out.push(raw); ppos += raw.length; } };
    emit("%PDF-1.4\n");
    off[1] = ppos; emit("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    const kidsStr = pages.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
    off[2] = ppos; emit(`2 0 obj\n<< /Type /Pages /Count ${pages.length} /Kids [${kidsStr}] >>\nendobj\n`);
    pages.forEach((pg, i) => {
      const pageId = 3 + i * 3, contentId = pageId + 1, imgId = pageId + 2;
      const scale = Math.min((555) / pg.w, (802) / pg.h);
      const dw = pg.w * scale, dh = pg.h * scale, x = (595 - dw) / 2, y = (842 - dh) / 2;
      const stream = `q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im${i} Do Q`;
      off[pageId] = ppos;
      emit(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im${i} ${imgId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`);
      off[contentId] = ppos;
      emit(`${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`);
      const b64 = (pg.dataUrl.split(",")[1] || "");
      const bin = atob(b64); const jpeg = new Uint8Array(bin.length);
      for (let j = 0; j < bin.length; j++) jpeg[j] = bin.charCodeAt(j);
      off[imgId] = ppos;
      emit(`${imgId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pg.w} /Height ${pg.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`, jpeg);
      emit("\nendstream\nendobj\n");
    });
    const xrefPos = ppos; const maxObj = 2 + pages.length * 3;
    let xref = `xref\n0 ${maxObj + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= maxObj; i++) xref += String(off[i] || 0).padStart(10, "0") + " 00000 n \n";
    emit(xref); emit(`trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`);
    const buf = new Uint8Array(out.reduce((n, a) => n + a.length, 0));
    let o = 0; out.forEach(a => { buf.set(a, o); o += a.length; });
    triggerDownload(new Blob([buf], { type: "application/pdf" }), filename || "租屋合約書.pdf");
  } catch { toast("下載失敗，請再試一次"); }
}
function openContractViewer(images, index) {
  closeContractViewer();
  const wrap = document.createElement("div");
  wrap.className = "lightbox"; wrap.id = "contract-box";
  wrap.innerHTML = `
    <div class="lightbox-bar"><button type="button" id="lb-close">關閉</button><span>${index + 1} / ${images.length}</span><button type="button" id="lb-pdf">下載 PDF</button></div>
    <img src="${images[index]}" alt="合約書大圖">
    <div class="lightbox-nav">
      <button type="button" id="lb-prev" ${index === 0 ? "disabled" : ""}>上一張</button>
      <button type="button" id="lb-next" ${index === images.length - 1 ? "disabled" : ""}>下一張</button>
    </div>`;
  (document.querySelector(".shell") || document.body).appendChild(wrap);
  document.getElementById("lb-close").onclick = closeContractViewer;
  wrap.addEventListener("click", e => { if (e.target === wrap) closeContractViewer(); });
  document.getElementById("lb-pdf").onclick = e => { e.preventDefault(); e.stopPropagation(); downloadContractsPdf([images[index]], contractPdfName(index + 1)); };
  document.getElementById("lb-prev").onclick = () => { if (index > 0) openContractViewer(images, index - 1); };
  document.getElementById("lb-next").onclick = () => { if (index < images.length - 1) openContractViewer(images, index + 1); };
}

function gcalRange(local) {
  const start = new Date(local); if (isNaN(start)) return "";
  const end = new Date(start.getTime() + 3600000);
  const fmt = d => {
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
  };
  return fmt(start) + "/" + fmt(end);
}
function openGoogleCalendar(item, kind) {
  if (!item || !item.appointAt) { toast("請先選擇預約日期"); return; }
  const range = gcalRange(item.appointAt);
  if (!range) { toast("預約時間格式不正確"); return; }
  const room = state.rooms.find(x => x.id === item.roomId);
  const tenant = state.tenants.find(x => x.id === item.tenantId);
  const isRenew = kind === "renew" || !item.type;
  const text = encodeURIComponent(isRenew ? `${room ? room.no : ""} 續約簽約` : `${room ? room.no : ""} ${item.type}維修`);
  const details = encodeURIComponent(isRenew
    ? `統潔＆信潔開發有限公司續約簽約\n租客：${tenant ? tenant.name : ""}\n房號：${room ? room.no : ""}`
    : `統潔＆信潔開發有限公司報修預約\n租客：${tenant ? tenant.name : ""}\n房號：${room ? room.no : ""}\n說明：${item.note || ""}`);
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${range}&details=${details}`, "_blank", "noopener");
}
function calendarItems() {
  const items = [];
  (state.repairs || []).forEach(r => {
    if (!r.appointAt) return;
    const room = state.rooms.find(x => x.id === r.roomId);
    const tenant = state.tenants.find(x => x.id === r.tenantId);
    items.push({
      at: r.appointAt, kind: "repair", id: r.id, item: r,
      title: `${room ? room.no : ""} ${r.type}維修`,
      sub: `${tenant ? tenant.name : ""} · ${formatDateTime12(String(r.appointAt).replace("T", " "))}`
    });
  });
  (state.renewals || []).forEach(r => {
    if (!r.appointAt || r.status === "done") return;
    const room = state.rooms.find(x => x.id === r.roomId);
    const tenant = state.tenants.find(x => x.id === r.tenantId);
    items.push({
      at: r.appointAt, kind: "renew", id: r.id, item: r,
      title: `${room ? room.no : ""} 續約簽約`,
      sub: `${tenant ? tenant.name : ""} · ${formatDateTime12(String(r.appointAt).replace("T", " "))}`
    });
  });
  return items.sort((a, b) => String(a.at).localeCompare(String(b.at)));
}
function ymdOf(value) {
  const m = String(value || "").match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}
function ensureCalMonth() {
  if (ui.calYear && ui.calMonth) return;
  const n = new Date();
  ui.calYear = n.getFullYear();
  ui.calMonth = n.getMonth() + 1;
  ui.calDay = n.getDate();
}
function collectLedger() {
  const rows = [];
  (state.books || []).forEach(b => {
    const amount = Number(b.amount) || 0;
    if (!amount) return;
    rows.push({
      id: b.id, type: b.type === "out" ? "out" : "in", date: ymdOf(b.date), amount,
      roomNo: b.roomNo || "", note: b.note || "", company: b.company || "統潔",
      bank: b.bank || "", place: b.place || "",
      source: "book", canDel: true, canEdit: true
    });
  });
  (state.bankSlips || []).forEach(s => {
    const amount = Number(s.amount) || 0;
    if (!amount) return;
    const room = state.rooms.find(r => String(r.no) === String(s.roomNo || ""));
    const company = cellAccount(s.company || s.note) || roomCompany(room || {}) || "統潔";
    rows.push({
      id: "slip-" + s.id, type: guessCashType(s.note, "in"), date: ymdOf(s.date), amount,
      roomNo: s.roomNo || "", note: s.note || "銀行入帳", company,
      bank: s.bank || "", place: s.place || "",
      source: "slip", canDel: false, canEdit: true
    });
  });
  (state.errands || []).forEach(e => {
    if (e.kind === "doc" || e.skipLedger) return;
    const amount = Number(e.amount) || 0;
    if (!amount) return;
    const blob = [e.title, e.place, e.note, e.company].join(" ");
    const company = cellAccount(e.company || blob) || "統潔";
    rows.push({
      id: "errand-" + e.id,
      type: guessCashType(blob, "out"),
      date: ymdOf(e.date), amount,
      roomNo: "", note: ["銀行業務", e.title, e.place, e.note].filter(Boolean).join(" · "),
      company, bank: e.bank || e.place || "", place: e.place || "",
      source: "errand", canDel: false, canEdit: false
    });
  });
  const taken = new Set(rows.filter(x => x.roomNo).map(x => String(x.roomNo)));
  state.tenants.filter(t => t.paid).forEach(t => {
    const room = state.rooms.find(r => r.id === t.roomId);
    const date = ymdOf(t.paidAt);
    if (!date) return;
    if (room && taken.has(String(room.no))) return;
    const amount = Number(room && room.rent) || 0;
    if (!amount) return;
    rows.push({
      id: "rent-" + t.id, type: "in", date, amount,
      roomNo: room ? room.no : "", note: (t.name || "") + " 租金", company: roomCompany(room || {}),
      bank: "聯邦",
      source: "rent", canDel: false, canEdit: false
    });
  });
  return dedupeLedger(rows);
}
function ledgerDupKey(row) {
  return [ymdOf(row.date), row.type === "out" ? "out" : "in", Number(row.amount) || 0, rowAccount(row)].join("|");
}
function dedupeLedger(rows) {
  const rank = { book: 1, slip: 2, errand: 3, rent: 4 };
  const list = rows.filter(x => x.date && x.amount).slice().sort((a, b) => (rank[a.source] || 9) - (rank[b.source] || 9));
  const seen = new Set();
  const out = [];
  list.forEach(r => {
    const k = ledgerDupKey(r);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(r);
  });
  return out;
}
function guessCashType(text, fallback) {
  return cellType(text, "") || fallback || "in";
}
function isCashAccount(name) {
  const a = cellAccount(name) || name;
  return BOOK_ACCOUNTS.includes(a) || REPORT_ACCOUNTS.includes(a) || PERSONAL_ACCOUNTS.includes(a) || isPersonalKey(a);
}
function personalKey(name) { return "個人戶·" + name; }
function isPersonalKey(c) {
  const s = String(c || "");
  return s === "個人戶" || s.startsWith("個人戶·") || PERSONAL_ACCOUNTS.includes(s) || PERSONAL_PEOPLE.includes(s);
}
function personOfAccount(c) {
  const s = String(c || "").trim();
  if (s.startsWith("個人戶·")) return s.slice("個人戶·".length);
  if (PERSONAL_PEOPLE.includes(s)) return s;
  const hit = PERSONAL_PEOPLE.find(p => s === p || s.indexOf(p) >= 0);
  if (hit) return hit;
  if (/趙海成|趙正賢/.test(s)) return "趙海成、趙正賢";
  return "";
}
function accountLabel(c) {
  const p = personOfAccount(c);
  if (p) return "個人戶 · " + p;
  return String(c || "統潔");
}
function bookAccountOptions(selected) {
  const sel = String(selected || "統潔");
  const opt = (v, label) => `<option value="${escapeHtml(v)}" ${sel === v ? "selected" : ""}>${escapeHtml(label || v)}</option>`;
  const people = PERSONAL_PEOPLE.map(p => opt(personalKey(p), p)).join("");
  const extra = (sel === "個人戶" || (isPersonalKey(sel) && !PERSONAL_ACCOUNTS.includes(sel)))
    ? opt(sel, accountLabel(sel)) : "";
  return `${opt("統潔")}${opt("信潔")}${opt("聯名戶")}<optgroup label="個人戶">${extra}${people}</optgroup>${opt("現金(保險箱)")}`;
}
function isBookCompany(v) {
  return BOOK_ACCOUNTS.includes(v) || PERSONAL_ACCOUNTS.includes(v) || v === "個人戶" || isPersonalKey(v);
}
function normalizeBookCompany(v) {
  const s = String(v || "").trim();
  if (PERSONAL_ACCOUNTS.includes(s) || BOOK_ACCOUNTS.includes(s)) return s;
  const p = personOfAccount(s);
  if (p) return personalKey(p);
  return cellAccount(s) || "統潔";
}
function rowAccount(row) {
  const c = String((row && row.company) || "");
  if (isPersonalKey(c) || personOfAccount(c)) return "個人戶";
  if (REPORT_ACCOUNTS.includes(c) || c === "聯名戶") return c;
  if (/現金|保險/.test(c)) return "現金(保險箱)";
  if (/個人/.test(c)) return "個人戶";
  if (/聯名/.test(c)) return "聯名戶";
  if (/信潔/.test(c)) return "信潔";
  return "統潔";
}
function ledgerMatchesFilter(row, filter, bank) {
  const f = String(filter || "").trim();
  if (f) {
    if (f !== "個人戶" && isPersonalKey(f)) {
      const p = personOfAccount(f);
      if (!(p && (personOfAccount(row.company) === p || String(row.company || "").indexOf(p) >= 0))) return false;
    } else if (rowAccount(row) !== f) return false;
  }
  const bk = String(bank || "").trim();
  if (bk && !splitBanks(rowBank(row)).includes(bk) && rowBank(row) !== bk) return false;
  return true;
}
function splitBanks(s) {
  return String(s || "").split(/[、,，/]+/).map(x => x.replace(/銀行/g, "").trim()).filter(Boolean);
}
function guessBank(text) {
  const s = String(text || "");
  if (/超商|全家|7-?11|萊爾富|OK超商/.test(s)) return "超商";
  if (/農會/.test(s)) return "農會";
  if (/兆豐/.test(s)) return "兆豐";
  if (/聯邦/.test(s)) return "聯邦";
  return "";
}
function banksOf(acct) {
  return ACCOUNT_BANKS[acct] || [];
}
function rowBank(row) {
  const acct = rowAccount(row);
  const allowed = banksOf(acct);
  const extra = ["超商"];
  const ok = allowed.length ? allowed.concat(extra.filter(x => !allowed.includes(x))) : extra;
  const parts = splitBanks(row && (row.bank || row.place));
  const hit = parts.filter(p => ok.includes(p));
  if (hit.length) return [...new Set(hit)].join("、");
  const g = guessBank([row && row.bank, row && row.place, row && row.note, row && row.company].join(" "));
  if (g && (ok.includes(g) || !allowed.length)) return g;
  return allowed[0] || "";
}
function ledgerLineLabel(row) {
  const acct = accountLabel(row.company || "統潔");
  const bank = rowBank(row);
  return bank ? acct + " · " + bank : acct;
}
function ledgerSearchHay(x) {
  return [x.date, x.type === "in" ? "進帳收入" : "出帳支出", accountLabel(x.company), x.company, rowBank(x), x.note, x.amount, money(x.amount)].join(" ");
}
function bankPeriodBits(acct, start, end) {
  const banks = banksOf(acct);
  if (!banks.length) return [];
  const rows = collectLedger().filter(x => rowAccount(x) === acct && x.date >= start && x.date <= end);
  return banks.map(b => {
    const hit = rows.filter(x => rowBank(x) === b);
    return {
      name: b,
      inn: hit.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0),
      out: hit.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0)
    };
  });
}
function bankSelectHtml(acct, selected) {
  const banks = banksOf(acct);
  if (!banks.length) return "";
  const sel = banks.includes(selected) ? selected : banks[0];
  return `<select name="bank">${banks.map(b => `<option value="${b}" ${b === sel ? "selected" : ""}>${b}</option>`).join("")}</select>`;
}
function ensureReportPeriod() {
  const n = new Date();
  if (!ui.reportYear) ui.reportYear = n.getFullYear();
  if (!ui.reportMonth) ui.reportMonth = n.getMonth() + 1;
  if (ui.reportMode !== "year") ui.reportMode = "month";
}
function reportBounds() {
  ensureReportPeriod();
  const y = ui.reportYear, m = ui.reportMonth;
  if (ui.reportMode === "year") {
    return { start: y + "-01-01", end: y + "-12-31", label: y + " 年", unit: "年", prev: "上一年", next: "下一年" };
  }
  const last = new Date(y, m, 0).getDate();
  const mm = String(m).padStart(2, "0");
  return {
    start: y + "-" + mm + "-01",
    end: y + "-" + mm + "-" + String(last).padStart(2, "0"),
    label: y + " 年 " + m + " 月",
    unit: "月", prev: "上一月", next: "下一月"
  };
}
function accountOpening(name) {
  const map = state.accountOpenings || {};
  const raw = Number(map[name]) || 0;
  if (name === "個人戶") {
    return raw + PERSONAL_PEOPLE.reduce((s, p) => s + (Number(map[personalKey(p)]) || 0), 0);
  }
  return raw;
}
function ledgerRowsForAccount(name) {
  const rows = collectLedger();
  if (name === "個人戶") return rows.filter(x => rowAccount(x) === "個人戶");
  const person = personOfAccount(name);
  if (person) return rows.filter(x => personOfAccount(x.company) === person);
  return rows.filter(x => rowAccount(x) === name);
}
function accountStats(name, start, end) {
  const rows = ledgerRowsForAccount(name);
  const period = rows.filter(x => x.date >= start && x.date <= end);
  const inn = period.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
  const out = period.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
  const hist = rows.filter(x => x.date <= end);
  const balIn = hist.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
  const balOut = hist.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
  const ledger = balIn - balOut;
  const opening = name === "個人戶"
    ? accountOpening("個人戶")
    : (Number((state.accountOpenings || {})[name]) || 0);
  return { inn, out, net: inn - out, ledger, bal: ledger + opening, count: period.length };
}
function shiftReport(delta) {
  ensureReportPeriod();
  if (ui.reportMode === "year") ui.reportYear += delta;
  else {
    ui.reportMonth += delta;
    if (ui.reportMonth < 1) { ui.reportMonth = 12; ui.reportYear -= 1; }
    if (ui.reportMonth > 12) { ui.reportMonth = 1; ui.reportYear += 1; }
  }
}
function overallReportBodyHtml() {
  const b = reportBounds();
  const stats = REPORT_ACCOUNTS.map(n => Object.assign({ name: n }, accountStats(n, b.start, b.end)));
  const joint = accountStats("聯名戶", b.start, b.end);
  const totalBal = stats.reduce((s, x) => s + x.bal, 0) + joint.bal;
  const totalIn = stats.reduce((s, x) => s + x.inn, 0) + joint.inn;
  const totalOut = stats.reduce((s, x) => s + x.out, 0) + joint.out;
  return `<div class="cal-nav">
      <button type="button" class="ghost" data-report-nav="-1">${b.prev}</button>
      <strong>${b.label}</strong>
      <button type="button" class="ghost" data-report-nav="1">${b.next}</button>
    </div>
    <div class="acct-grid">
      ${stats.map(s => `
        <div class="acct-card${ui.calFilter === s.name ? " on" : ""}" data-filter-acct="${escapeHtml(s.name)}" role="button">
          <div class="k">${escapeHtml(s.name)}</div>
          <div class="acct-row"><span class="led-in">本期收入</span><strong class="led-in">${money(s.inn)}</strong></div>
          <div class="acct-row"><span class="led-out">本期支出</span><strong class="led-out">${money(s.out)}</strong></div>
          ${banksOf(s.name).length ? `<div class="acct-banks">${bankPeriodBits(s.name, b.start, b.end).map(bk => `
            <button type="button" class="acct-bank${ui.calFilter === s.name && ui.calBank === bk.name ? " on" : ""}" data-filter-acct="${escapeHtml(s.name)}" data-filter-bank="${escapeHtml(bk.name)}">
              <span>${escapeHtml(bk.name)}</span>
              <span>收 ${money(bk.inn)}　支 ${money(bk.out)}</span>
            </button>`).join("")}</div>` : ""}
          ${s.name === "個人戶" ? `<button type="button" class="acct-drop-btn" id="acct-person-pick">請下拉選擇</button>` : ""}
          <button type="button" class="acct-bal" data-edit-acct="${escapeHtml(s.name)}">營收總額　${money(s.bal)}</button>
        </div>`).join("")}
    </div>
    ${joint.inn || joint.out || joint.bal ? `<div class="small" style="margin-top:10px">聯名戶營收總額 ${money(joint.bal)}</div>` : ""}
    <div class="acct-total">
      <div>
        <div class="k">總餘額</div>
        <div class="small">四戶累計至 ${escapeHtml(b.label)}　本期收入 ${money(totalIn)}　本期支出 ${money(totalOut)}</div>
      </div>
      <strong class="${totalBal >= 0 ? "led-in" : "led-out"}">${money(totalBal)}</strong>
    </div>
    ${revenueTableHtml()}`;
}
function overallReportHtml() {
  const b = reportBounds();
  const yearOn = ui.reportMode === "year";
  if (ui.editAcct && (REPORT_ACCOUNTS.includes(ui.editAcct) || isPersonalKey(ui.editAcct))) {
    const s = Object.assign({ name: ui.editAcct }, accountStats(ui.editAcct, b.start, b.end));
    return `<div class="card card-body" id="overall-report">
      <button type="button" class="back" id="acct-bal-back">← 返回</button>
      <h2 class="dash-h">${escapeHtml(accountLabel(s.name))}　營收總額</h2>
      <div class="small">輸入目前實際餘額後儲存。之後用「新增一筆」進出帳會自動加減。</div>
      <div class="acct-row" style="margin-top:12px"><span class="led-in">本期收入</span><strong class="led-in">${money(s.inn)}</strong></div>
      <div class="acct-row"><span class="led-out">本期支出</span><strong class="led-out">${money(s.out)}</strong></div>
      <form id="acct-bal-form" style="margin-top:14px">
        <label class="field"><span>營收總額</span>
          <input name="bal" type="text" inputmode="decimal" value="${s.bal}" />
        </label>
        <button class="btn-navy" type="submit">儲存</button>
      </form>
    </div>`;
  }
  return `<div class="card card-body" id="overall-report">
    <div class="report-head">
      <h2 class="dash-h" style="margin:0">整體報表</h2>
      <div class="small">四戶歷史營收：本期收支與截至本期的營收總額</div>
      <div class="report-actions no-print">
        <div class="seg ${yearOn ? "is-year" : "is-month"}" id="report-period-seg">
          <i class="seg-bg"></i>
          <button type="button" class="${yearOn ? "on" : ""}" data-report-mode="year">年</button>
          <button type="button" class="${yearOn ? "" : "on"}" data-report-mode="month">月</button>
        </div>
        <button type="button" class="ghost" id="export-report">匯出</button>
        <button type="button" class="ghost" id="print-report">列印</button>
      </div>
    </div>
    <div id="report-body">${overallReportBodyHtml()}</div>
  </div>`;
}
function applyReportMode(mode) {
  const next = mode === "year" ? "year" : "month";
  if (ui.reportMode === next) return;
  ui.reportMode = next;
  ui.keepScroll = true;
  const seg = document.getElementById("report-period-seg");
  if (seg) {
    setSegSide(seg, next === "month", "is-year", "is-month");
    seg.querySelectorAll("[data-report-mode]").forEach(b => b.classList.toggle("on", b.dataset.reportMode === next));
  }
  const body = document.getElementById("report-body");
  if (body) {
    body.innerHTML = overallReportBodyHtml();
    bindReportBody();
  }
  const pies = document.getElementById("report-pies");
  if (pies) {
    pies.innerHTML = reportPiesHtml();
    bindReportModeBtns();
  }
  if (!body) {
    ui.keepScroll = true;
    render();
  }
}
function bindReportBody() {
  document.querySelectorAll("[data-report-nav]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      shiftReport(Number(btn.dataset.reportNav));
      const body = document.getElementById("report-body");
      if (body) {
        body.innerHTML = overallReportBodyHtml();
        bindReportBody();
      } else {
        ui.keepScroll = true;
        render();
      }
      const pies = document.getElementById("report-pies");
      if (pies) {
        pies.innerHTML = reportPiesHtml();
        bindReportModeBtns();
      }
    };
  });
  document.querySelectorAll("[data-filter-acct]").forEach(card => {
    card.onclick = e => {
      if (e.target.closest("button")) return;
      const name = card.dataset.filterAcct;
      ui.calFilter = ui.calFilter === name && !ui.calBank ? "" : name;
      ui.calBank = "";
      ensureCalMonth();
      if (ui.calFilter && !ui.calDay) {
        ui.calDay = 1;
        ui.calDayEnd = new Date(ui.calYear, ui.calMonth, 0).getDate();
      }
      ui.keepScroll = true;
      render();
      requestAnimationFrame(() => {
        const box = document.getElementById("month-cash");
        if (box) box.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
  });
  document.querySelectorAll("[data-filter-bank]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const name = btn.dataset.filterAcct;
      const bank = btn.dataset.filterBank;
      if (ui.calFilter === name && ui.calBank === bank) ui.calBank = "";
      else { ui.calFilter = name; ui.calBank = bank; }
      ensureCalMonth();
      if (ui.calFilter && !ui.calDay) {
        ui.calDay = 1;
        ui.calDayEnd = new Date(ui.calYear, ui.calMonth, 0).getDate();
      }
      ui.keepScroll = true;
      render();
      requestAnimationFrame(() => {
        const box = document.getElementById("month-cash");
        if (box) box.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
  });
  document.querySelectorAll("[data-edit-acct]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.editAcct = btn.dataset.editAcct;
      ui.keepScroll = true;
      render();
    };
  });
  const pick = document.getElementById("acct-person-pick");
  if (pick) pick.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    ui.personPick = true;
    ui.keepScroll = true;
    render();
  };
  document.querySelectorAll("[data-rev-zoom]").forEach(card => {
    card.onclick = () => openRevZoom(card, card.dataset.revZoom);
    card.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRevZoom(card, card.dataset.revZoom); } };
    card.addEventListener("touchstart", e => e.stopPropagation(), { passive: true });
    card.addEventListener("touchmove", e => e.stopPropagation(), { passive: true });
  });
  document.querySelectorAll("[data-pick-person]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.personPick = false;
      ui.editAcct = btn.dataset.pickPerson;
      ui.keepScroll = true;
      render();
    };
  });
  const pickCancel = document.getElementById("person-pick-cancel");
  if (pickCancel) pickCancel.onclick = () => { ui.personPick = false; ui.keepScroll = true; render(); };
  const pickMask = document.getElementById("person-pick-mask");
  if (pickMask) pickMask.onclick = e => {
    if (e.target === pickMask) { ui.personPick = false; ui.keepScroll = true; render(); }
  };
}
function bindReportModeBtns() {
  document.querySelectorAll("[data-report-mode]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      applyReportMode(btn.dataset.reportMode);
    };
  });
}
function bindReportPeriodSeg() {
  const periodSeg = document.getElementById("report-period-seg");
  if (!periodSeg) return;
  let x0 = 0, y0 = 0, swiping = false;
  periodSeg.addEventListener("pointerdown", e => {
    x0 = e.clientX; y0 = e.clientY; swiping = false;
  });
  periodSeg.addEventListener("pointermove", e => {
    if (!x0) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(e.clientY - y0)) swiping = true;
  });
  periodSeg.addEventListener("pointerup", e => {
    const dx = e.clientX - x0;
    x0 = 0;
    if (!swiping) return;
    e.preventDefault();
    if (dx < -24) applyReportMode("month");
    else if (dx > 24) applyReportMode("year");
  });
  periodSeg.addEventListener("click", e => {
    if (swiping) { e.preventDefault(); e.stopPropagation(); swiping = false; }
  }, true);
}
function calDayListHtml(selected, rangeLabel, extra) {
  return `<div class="small">${rangeLabel}${extra || ""}</div>
    ${selected.length ? selected.map(x => `
      <div class="mini clickable" data-edit-led="${x.id}" data-edit-src="${x.source}">
        <b><span class="${x.type === "in" ? "led-in" : "led-out"}">${x.type === "in" ? "進帳" : "出帳"}</span> · ${escapeHtml(ledgerLineLabel(x))} · ${money(x.amount)}</b>
        <span>${escapeHtml((x.date || "").slice(8) + "日　" + (x.note || ""))}</span>
        ${x.canDel ? `<button type="button" class="ghost" data-del-book="${x.id}" style="width:auto;margin-top:6px">刪除</button>` : ""}
      </div>`).join("") : ((ui.calDay || normSearch(ui.calQ)) ? `<div class="empty">${normSearch(ui.calQ) ? "找不到符合的進出帳" : "這段期間尚無紀錄"}</div>` : "")}`;
}
function refreshCalSearchLive() {
  ensureCalMonth();
  const y = ui.calYear, m = ui.calMonth;
  const key = `${y}-${String(m).padStart(2, "0")}`;
  const q = normSearch(ui.calQ);
  const allRows = collectLedger().filter(x => x.date && x.date.slice(0, 7) === key);
  const rows = allRows.filter(x => ledgerMatchesFilter(x, ui.calFilter || "", ui.calBank) && (!q || normSearch(ledgerSearchHay(x)).indexOf(q) >= 0));
  const hitDays = new Set(rows.map(x => Number(String(x.date).slice(8, 10))));
  document.querySelectorAll("[data-cal-day]").forEach(btn => {
    const d = Number(btn.dataset.calDay);
    btn.classList.toggle("dim", !!(q && !hitDays.has(d)));
  });
  const dim = new Date(y, m, 0).getDate();
  const selA = ui.calDay && ui.calDay <= dim ? ui.calDay : 0;
  const selB = ui.calDayEnd && ui.calDayEnd <= dim ? ui.calDayEnd : selA;
  const rangeStart = selA ? Math.min(selA, selB || selA) : 0;
  const rangeEnd = selA ? Math.max(selA, selB || selA) : 0;
  const dayKey = d => `${key}-${String(d).padStart(2, "0")}`;
  const selected = [];
  if (rangeStart) {
    for (let d = rangeStart; d <= rangeEnd; d++) selected.push(...rows.filter(x => x.date === dayKey(d)));
  } else if (q) selected.push(...rows);
  const rangeLabel = rangeStart
    ? (rangeStart === rangeEnd ? `${m} 月 ${rangeStart} 日` : `${m} 月 ${rangeStart} 日－${rangeEnd} 日`)
    : q ? "搜尋結果"
    : "點選、拉選日期或搜尋查看進出帳";
  const extra = rangeStart && rangeEnd !== rangeStart ? `　共 ${rangeEnd - rangeStart + 1} 天` : "";
  const box = document.querySelector("#month-cash .cal-day");
  if (box) {
    box.innerHTML = calDayListHtml(selected, rangeLabel, extra);
    bindCalLedgerRows();
  }
  const inn = rows.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
  const out = rows.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
  const sum = document.querySelector("#month-cash .cal-sum");
  if (sum) {
    const spans = sum.querySelectorAll("span");
    if (spans[0]) spans[0].textContent = "進帳 " + money(inn);
    if (spans[1]) spans[1].textContent = "出帳 " + money(out);
    if (spans[2]) spans[2].textContent = "結餘 " + money(inn - out);
  }
}
function bindCalLedgerRows() {
  const stay = () => { ui.keepScroll = true; render(); };
  document.querySelectorAll("[data-del-book]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const id = btn.dataset.delBook;
      state.books = (state.books || []).filter(x => x.id !== id);
      if (ui.editBookId === id) ui.editBookId = null;
      save(); stay();
    };
  });
  document.querySelectorAll("[data-edit-led]").forEach(el => {
    el.onclick = e => {
      if (e.target.closest("[data-del-book]")) return;
      const src = el.dataset.editSrc;
      const id = el.dataset.editLed;
      if (src === "rent") { toast("這筆是租客繳費自動帶入，請到「租客」修改"); return; }
      if (src === "errand") { toast("這筆來自銀行業務，請到工作助手修改"); return; }
      ui.editBookId = src === "book" ? id : null;
      ui.editSlipId = src === "slip" ? id.replace(/^slip-/, "") : null;
      stay();
      requestAnimationFrame(() => {
        const box = document.getElementById("book-form");
        if (box) box.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    };
  });
}
function monthCashHtml() {
  ensureCalMonth();
  const editing = ui.editBookId ? (state.books || []).find(b => b.id === ui.editBookId) : null;
  const editingSlip = !editing && ui.editSlipId ? (state.bankSlips || []).find(s => s.id === ui.editSlipId) : null;
  const ed = editing || editingSlip;
  const y = ui.calYear, m = ui.calMonth;
  const key = `${y}-${String(m).padStart(2, "0")}`;
  const allRows = collectLedger().filter(x => x.date && x.date.slice(0, 7) === key);
  const filter = ui.calFilter || "";
  const q = normSearch(ui.calQ);
  const rows = allRows.filter(x => ledgerMatchesFilter(x, filter, ui.calBank) && (!q || normSearch(ledgerSearchHay(x)).indexOf(q) >= 0));
  const hitDays = new Set(rows.map(x => Number(String(x.date).slice(8, 10))));
  const inn = rows.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
  const out = rows.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
  const first = new Date(y, m - 1, 1);
  const start = first.getDay();
  const dim = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < start; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const dayKey = d => `${key}-${String(d).padStart(2, "0")}`;
  const byDay = d => rows.filter(x => x.date === dayKey(d));
  const selA = ui.calDay && ui.calDay <= dim ? ui.calDay : 0;
  const selB = ui.calDayEnd && ui.calDayEnd <= dim ? ui.calDayEnd : selA;
  const rangeStart = selA ? Math.min(selA, selB || selA) : 0;
  const rangeEnd = selA ? Math.max(selA, selB || selA) : 0;
  const selected = [];
  if (rangeStart) {
    for (let d = rangeStart; d <= rangeEnd; d++) selected.push(...byDay(d));
  } else if (q) {
    selected.push(...rows);
  }
  const rangeLabel = rangeStart
    ? (rangeStart === rangeEnd ? `${m} 月 ${rangeStart} 日` : `${m} 月 ${rangeStart} 日－${rangeEnd} 日`)
    : q ? "搜尋結果"
    : "點選、拉選日期或搜尋查看進出帳";
  return `<div class="card card-body cal-card" id="month-cash">
    <div class="row">
      <div>
        <h2 class="dash-h" style="margin:0">本月進出帳</h2>
        <div class="small">${filter ? "目前顯示：" + escapeHtml(accountLabel(filter)) + (ui.calBank ? " · " + escapeHtml(ui.calBank) : "") + "　點帳戶圖卡可切換" : "點上方統潔／信潔／個人戶／現金圖卡，可只看該戶進出帳"}</div>
      </div>
      <div class="cal-toolbar no-print">
        <button type="button" class="ghost" id="export-cal">匯出</button>
        <button type="button" class="ghost" id="print-cal">列印</button>
      </div>
    </div>
    <div class="card card-body tenant-search cal-search no-print">
      <input id="cal-search" type="search" enterkeyhint="search" placeholder="搜尋帳戶、備註、金額" value="${escapeHtml(ui.calQ || "")}" autocomplete="off" />
    </div>
    <div class="cal-nav">
      <button type="button" class="ghost" data-cal-nav="-1">上一月</button>
      <strong>${y} 年 ${m} 月</strong>
      <button type="button" class="ghost" data-cal-nav="1">下一月</button>
    </div>
    <div class="cal-sum">
      <span>進帳 ${money(inn)}</span>
      <span>出帳 ${money(out)}</span>
      <span>結餘 ${money(inn - out)}</span>
      <button type="button" class="ghost" id="cal-month-all">整月圈選</button>
      ${filter ? `<button type="button" class="ghost" id="cal-filter-clear" style="width:auto;padding:6px 10px">全部帳戶</button>` : ""}
    </div>
    <div class="cal-grid">
      ${["日", "一", "二", "三", "四", "五", "六"].map(w => `<div class="cal-w">${w}</div>`).join("")}
      ${cells.map(d => {
        if (!d) return `<div class="cal-cell empty"></div>`;
        const list = byDay(d);
        const di = list.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
        const dout = list.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
        return `<button type="button" class="cal-cell ${d >= rangeStart && d <= rangeEnd ? "on" : ""}${q && !hitDays.has(d) ? " dim" : ""}" data-cal-day="${d}">
          <em>${d}</em>
          ${di ? `<span class="in">+${di.toLocaleString("zh-TW")}</span>` : ""}
          ${dout ? `<span class="out">-${dout.toLocaleString("zh-TW")}</span>` : ""}
          ${!di && !dout && list.length ? `<span class="mark">記</span>` : ""}
        </button>`;
      }).join("")}
    </div>
    <div class="cal-day">
      ${calDayListHtml(selected, rangeLabel, rangeStart && rangeEnd !== rangeStart ? `　共 ${rangeEnd - rangeStart + 1} 天` : "")}
    </div>
    <form id="book-form" class="cal-form">
      <h2 class="dash-h">${ed ? "編輯這筆" : "新增一筆"}</h2>
      <div class="cal-form-row">
        <select name="type" class="book-type ${(ed && ed.type === "out") ? "out" : "in"}">
          <option value="in" ${(ed ? ed.type : "in") !== "out" ? "selected" : ""}>進帳</option>
          <option value="out" ${(ed && ed.type === "out") ? "selected" : ""}>出帳</option>
        </select>
        <select name="company">
          ${bookAccountOptions(ed ? ed.company : "統潔")}
        </select>
      </div>
      <div class="cal-form-row" id="book-bank-row" style="${banksOf(normalizeBookCompany(ed ? ed.company : "統潔")).length ? "" : "display:none"}">
        ${bankSelectHtml(normalizeBookCompany(ed ? ed.company : "統潔"), ed && ed.bank ? rowBank(ed) : "聯邦")}
        <span class="small" style="align-self:center">統潔分聯邦／農會／兆豐，信潔為聯邦</span>
      </div>
      <div class="cal-form-row">
        <input name="date" type="date" value="${ed ? ymdOf(ed.date) : (rangeStart ? dayKey(rangeStart) : ymdOf(nowStamp()))}" />
        <input name="amount" type="text" placeholder="金額" value="${ed ? (ed.amount || "") : ""}" />
      </div>
      <div class="cal-form-row">
        <input name="note" type="text" placeholder="備註" value="${ed ? escapeHtml(ed.note || "") : ""}" />
        <label class="upload xls-up">上傳檔案<input id="book-xls" type="file" accept=".xlsx,.xls,.csv,.xml,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv" hidden /></label>
      </div>
      <div class="small">可把做好的 Excel 上傳，工作助手會自動辨識並記入本月進出帳與整體報表。</div>
      <button class="btn-navy" type="button" id="book-save">${ed ? "儲存變更" : "記入日曆"}</button>
      ${ed ? `<button type="button" class="ghost" id="cancel-book-edit" style="margin-top:8px">取消編輯</button>` : ""}
    </form>
  </div>`;
}
function parseCsvText(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  const s = String(text || "").replace(/^\ufeff/, "");
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) {
      if (ch === '"' && s[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === "," || ch === "\t") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => String(c).trim()));
}
function parseSpreadsheetXml(xml) {
  const rows = [];
  const rowRe = /<Row\b[^>]*>([\s\S]*?)<\/Row>/gi;
  let rm;
  while ((rm = rowRe.exec(xml))) {
    const cells = [];
    const cellRe = /<Cell\b([^>]*)>([\s\S]*?)<\/Cell>/gi;
    let cm, idx = 0;
    while ((cm = cellRe.exec(rm[1]))) {
      const idxM = /ss:Index="(\d+)"/.exec(cm[1] || "");
      if (idxM) idx = Number(idxM[1]) - 1;
      while (cells.length < idx) cells.push("");
      const d = /<Data\b[^>]*>([\s\S]*?)<\/Data>/i.exec(cm[2] || "");
      cells[idx] = d ? d[1].replace(/<[^>]+>/g, "").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">") : "";
      idx++;
    }
    if (cells.some(c => String(c).trim())) rows.push(cells);
  }
  return rows;
}
function loadXlsxLib() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
    s.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error("no xlsx"));
    s.onerror = () => reject(new Error("xlsx"));
    document.head.appendChild(s);
  });
}
function excelSerialYmd(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num < 20000 || num > 80000) return "";
  const d = new Date(Date.UTC(1899, 11, 30) + Math.round(num) * 86400000);
  return d.toISOString().slice(0, 10);
}
function cellYmd(v) {
  if (v == null || v === "") return "";
  if (typeof v === "number") return excelSerialYmd(v);
  const s = String(v).trim();
  let m = s.match(/(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})/);
  if (m) return m[1] + "-" + String(m[2]).padStart(2, "0") + "-" + String(m[3]).padStart(2, "0");
  m = s.match(/(\d{4})\s*年\s*(\d{1,2})\s*月(?:\s*(\d{1,2})\s*日)?/);
  if (m) return m[1] + "-" + String(m[2]).padStart(2, "0") + "-" + String(m[3] || "1").padStart(2, "0");
  return ymdOf(s) || excelSerialYmd(s);
}
function cellAmount(v) {
  if (typeof v === "number" && Number.isFinite(v)) return Math.abs(v);
  const n = Number(String(v || "").replace(/[,，\s]/g, "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? Math.abs(n) : 0;
}
function cellAccount(v) {
  const s = String(v || "");
  const person = PERSONAL_PEOPLE.find(p => s.indexOf(p) >= 0) || (/趙海成|趙正賢/.test(s) ? "趙海成、趙正賢" : "");
  if (person) return personalKey(person);
  if (/現金|保險/.test(s)) return "現金(保險箱)";
  if (/個人/.test(s)) return "個人戶";
  if (/聯名/.test(s)) return "聯名戶";
  if (/信潔/.test(s)) return "信潔";
  if (/統潔/.test(s)) return "統潔";
  return "";
}
function cellType(v, amountRaw) {
  const s = String(v || "");
  if (/出帳|支出|付|借|withdraw|out|expense|繳費|繳款|帳單|水費|電費|瓦斯|稅/i.test(s)) return "out";
  if (/進帳|收入|收|貸|deposit|in|income/i.test(s)) return "in";
  if (typeof amountRaw === "number" && amountRaw < 0) return "out";
  if (/^-/.test(String(amountRaw || ""))) return "out";
  return "";
}
function mapSheetRows(rows) {
  if (!rows || !rows.length) return [];
  const norm = r => (r || []).map(c => String(c == null ? "" : c).trim());
  let headAt = -1;
  const headKeys = /日期|date|期間|進帳|出帳|金額|帳戶|備註|收入|支出|類型|項目/;
  for (let i = 0; i < Math.min(rows.length, 10); i++) {
    if (norm(rows[i]).some(c => headKeys.test(c))) { headAt = i; break; }
  }
  const col = { date: 0, type: -1, amount: -1, inn: -1, out: -1, company: -1, note: -1 };
  if (headAt >= 0) {
    norm(rows[headAt]).forEach((h, i) => {
      if (/日期|date|期間|入帳日|記帳日/.test(h) && col.date === 0) col.date = i;
      else if (/類型|收支|進帳\/出帳/.test(h)) col.type = i;
      else if (/本期收入|收入/.test(h) && !/淨/.test(h)) col.inn = i;
      else if (/本期支出|支出/.test(h) && !/淨/.test(h)) col.out = i;
      else if (/金額|amount/.test(h)) col.amount = i;
      else if (/帳戶|歸屬|公司|company/.test(h)) col.company = i;
      else if (/備註|說明|項目|note/.test(h)) col.note = i;
    });
  }
  const out = [];
  const start = headAt >= 0 ? headAt + 1 : 0;
  for (let i = start; i < rows.length; i++) {
    const raw = rows[i] || [];
    const line = norm(raw).join(" ");
    if (!line || /總計|總餘額|總覽|匯出時間|套房數|廠房數/.test(line)) continue;
    const date = cellYmd(raw[col.date] != null ? raw[col.date] : raw[0]);
    let type = col.type >= 0 ? cellType(raw[col.type], raw[col.amount]) : "";
    let amount = 0;
    if (col.inn >= 0 || col.out >= 0) {
      const inn = col.inn >= 0 ? cellAmount(raw[col.inn]) : 0;
      const outAmt = col.out >= 0 ? cellAmount(raw[col.out]) : 0;
      if (inn && !outAmt) { type = "in"; amount = inn; }
      else if (outAmt && !inn) { type = "out"; amount = outAmt; }
      else if (inn && outAmt) {
        if (date) {
          out.push({ date, type: "in", amount: inn, company: cellAccount(raw[col.company]) || "統潔", note: String(raw[col.note] != null ? raw[col.note] : raw[1] || "") });
          out.push({ date, type: "out", amount: outAmt, company: cellAccount(raw[col.company]) || "統潔", note: String(raw[col.note] != null ? raw[col.note] : raw[1] || "") });
        }
        continue;
      }
    }
    if (!amount && col.amount >= 0) amount = cellAmount(raw[col.amount]);
    if (!amount) {
      for (let k = raw.length - 1; k >= 0; k--) {
        const n = cellAmount(raw[k]);
        if (n) { amount = n; if (!type) type = cellType(raw[k], raw[k]); break; }
      }
    }
    if (!date || !amount) continue;
    if (!type) type = cellType(line, amount) || "in";
    const company = (col.company >= 0 ? cellAccount(raw[col.company]) : cellAccount(line)) || "統潔";
    const note = String((col.note >= 0 ? raw[col.note] : raw[1]) || "").trim();
    out.push({ date, type, amount, company, note });
  }
  return out;
}
function importBooksFromRows(list, fileName) {
  if (!list.length) return 0;
  if (!state.books) state.books = [];
  const seen = new Set(state.books.map(b => [b.date, b.type, b.amount, b.company, b.note || ""].join("|")));
  let n = 0;
  let first = "";
  list.forEach(row => {
    const key = [row.date, row.type, row.amount, row.company, row.note || ""].join("|");
    if (seen.has(key)) return;
    seen.add(key);
    state.books.push({
      id: "bk" + Date.now().toString(36) + Math.random().toString(16).slice(2, 6),
      type: row.type === "out" ? "out" : "in",
      date: row.date,
      amount: row.amount,
      company: normalizeBookCompany(row.company),
      note: row.note || ("Excel 匯入" + (fileName ? " · " + fileName : "")),
      roomNo: "",
      createdAt: nowStamp()
    });
    n++;
    if (!first) first = row.date;
  });
  if (n && first) {
    ui.calYear = Number(first.slice(0, 4));
    ui.calMonth = Number(first.slice(5, 7));
    ui.calDay = Number(first.slice(8, 10));
  }
  if (n) {
    if (!state.aiLogs) state.aiLogs = [];
    state.aiLogs.push({
      role: "ai",
      text: "已查看「" + (fileName || "Excel") + "」，辨識 " + n + " 筆記帳並記入本月進出帳與整體報表。"
    });
    save();
  }
  return n;
}
async function importExcelBooks(file, after) {
  toast("工作助手正在查看 Excel…");
  try {
    const name = file.name || "Excel";
    const buf = await file.arrayBuffer();
    let rows = [];
    const lower = name.toLowerCase();
    if (lower.endsWith(".csv") || file.type.indexOf("csv") >= 0) {
      rows = parseCsvText(new TextDecoder("utf-8").decode(buf));
    } else if (lower.endsWith(".xml") || /ss:Workbook|<Workbook/.test(new TextDecoder("utf-8").decode(buf.slice(0, 800)))) {
      rows = parseSpreadsheetXml(new TextDecoder("utf-8").decode(buf));
    } else {
      const XLSX = await loadXlsxLib();
      const wb = XLSX.read(buf, { type: "array", cellDates: true });
      wb.SheetNames.forEach(sn => {
        const sheet = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, raw: true, defval: "" });
        rows = rows.concat(sheet);
      });
    }
    const list = mapSheetRows(rows);
    const n = importBooksFromRows(list, name);
    toast(n ? "工作助手已記入 " + n + " 筆進出帳" : "看不懂這份表，請用日期、進帳／出帳、金額、帳戶、備註欄位");
    if (after) after();
  } catch (err) {
    toast("Excel 讀取失敗，請另存 CSV 或 .xlsx 再試");
  }
}
function isSheetFile(f) {
  const n = String((f && f.name) || "").toLowerCase();
  const t = String((f && f.type) || "");
  return /\.(xlsx|xls|csv|xml)$/.test(n) || /spreadsheet|excel|csv/.test(t);
}
function guessParty(text) {
  const s = String(text || "");
  if (!s) return null;
  const fac = FACTORY_TENANT_INFO || {};
  for (const no of Object.keys(fac)) {
    const info = fac[no] || {};
    const n = String(info.name || "");
    if (!n) continue;
    const short = n.replace(/股份有限公司|有限公司|企業|公司/g, "");
    if (s.indexOf(n) >= 0 || (short.length >= 2 && s.indexOf(short) >= 0)) {
      return { no, name: n, rent: Number(info.rent) || 0, kind: "factory" };
    }
  }
  for (const t of (state.tenants || [])) {
    const n = String(t.name || "");
    if (n && n.length >= 2 && s.indexOf(n) >= 0) {
      const room = state.rooms.find(r => r.id === t.roomId);
      return { no: room && room.no, name: n, rent: Number(room && room.rent) || 0, kind: "studio" };
    }
  }
  return null;
}
function guessBill(text) {
  const s = String(text || "");
  if (/台電|電費|電力/.test(s)) return { name: "電費", place: "超商" };
  if (/台水|水費|自來水/.test(s)) return { name: "水費", place: "超商" };
  if (/瓦斯/.test(s)) return { name: "瓦斯費", place: "超商" };
  if (/垃圾|清潔費/.test(s)) return { name: "清潔費", place: "超商" };
  if (/中華電信|遠傳|台哥大|台灣大哥大|亞太/.test(s)) return { name: "電信費", place: "超商" };
  if (/地價稅|房屋稅|牌照稅|所得稅/.test(s)) return { name: "稅金", place: "超商" };
  if (/繳費單|繳款單|帳單|繳費/.test(s)) return { name: "繳費", place: "超商" };
  return null;
}
function inferFromUpload(files) {
  const list = [...(files || [])];
  const names = list.map(f => f.name).join(" ");
  const blob = names;
  const party = guessParty(blob);
  const bill = guessBill(blob);
  const meta = list.map(f => guessMetaFromName(f.name));
  const date = (meta.find(x => x.date) || {}).date || (list[0] && list[0].lastModified
    ? (() => { const d = new Date(list[0].lastModified); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })()
    : ymdOf(nowStamp()));
  const amount = (meta.find(x => x.amount) || {}).amount || (party && !bill && party.rent) || 0;
  const bank = guessBank(blob) || (meta.find(x => x.bank) || {}).bank || "";
  let title = "現場紀錄";
  let company = cellAccount(blob) || "";
  let pendingBank = false;
  let place = bank;
  let cashType = cellType(blob, amount) || "in";
  if (bill) {
    title = "繳費　" + bill.name;
    cashType = "out";
    place = place || bill.place;
    if (!company) company = "統潔";
  } else if (/收租|租金|收現|現金|收錢/.test(blob) || (party && !bank && !/存摺|對帳|簿子/.test(blob))) {
    title = party ? ("收租　" + party.name) : "收租／收現";
    company = "現金(保險箱)";
    pendingBank = true;
    place = place || "現金";
    cashType = "in";
  } else if (/超商/.test(blob) && !bank) {
    title = "超商";
    place = "超商";
  } else if (/存摺|對帳|簿子|入帳|銀行/.test(blob) || bank) {
    title = "跑銀行／入帳";
    place = place || "";
    cashType = cashType === "out" ? "out" : "in";
  } else if (party) {
    title = "收租　" + party.name;
    company = "現金(保險箱)";
    pendingBank = true;
    place = "現金";
    cashType = "in";
  }
  return {
    date, title, place, amount, company,
    note: [bill && bill.name, party && party.name, names].filter(Boolean).join(" · "),
    pendingBank, party, bill, files: names, cashType,
    needCompany: !company,
    needBank: !place && cashType !== "out" && !pendingBank,
    needAmount: !amount
  };
}
function errandGuessHtml(g) {
  if (!g) return `<div id="errand-guess-box"><div class="mini" id="errand-guess"><b>預判</b><span>直接上傳即可，不用先選銀行或公司。分不出來才會問你。</span></div></div>`;
  const bits = [
    g.date, g.title, g.place, g.company,
    g.amount ? money(g.amount) : "",
    g.cashType === "out" ? "支出" : "",
    g.pendingBank ? "先入現金，待存銀行" : ""
  ].filter(Boolean);
  const askCo = g.needCompany ? `<div class="bank-picks guess-picks">${["統潔", "信潔", "聯名戶", "現金(保險箱)"].map(c => `<button type="button" class="bank-pick" data-guess-co="${c}">${c}</button>`).join("")}</div>` : "";
  const askBk = g.needBank ? `<div class="bank-picks guess-picks">${BANK_PLACES.map(b => `<button type="button" class="bank-pick" data-guess-bk="${b}">${b}</button>`).join("")}</div>` : "";
  const hint = g.needAmount ? `<div class="small">照片裡若看得到金額，請把檔名帶上數字，或改傳 Excel／明細，計算才準。</div>` : "";
  return `<div id="errand-guess-box">
    <div class="mini" id="errand-guess"><b>預判</b><span>${escapeHtml(bits.join(" · ") || "已收到檔案")}</span></div>
    ${g.needCompany ? `<div class="small">這筆是哪間公司？</div>${askCo}` : ""}
    ${g.needBank ? `<div class="small">這本是哪家銀行？</div>${askBk}` : ""}
    ${hint}
  </div>`;
}
function refreshErrandGuessBox() {
  const box = document.getElementById("errand-guess-box") || document.getElementById("errand-guess");
  if (!box) return;
  const html = errandGuessHtml(ui.errandGuess);
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  if (tmp.firstElementChild) box.replaceWith(tmp.firstElementChild);
  bindErrandGuessPicks();
}
function bindErrandGuessPicks() {
  document.querySelectorAll("[data-guess-co]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      if (!ui.errandGuess) ui.errandGuess = {};
      ui.errandGuess.company = btn.dataset.guessCo;
      ui.errandGuess.needCompany = false;
      refreshErrandGuessBox();
    };
  });
  document.querySelectorAll("[data-guess-bk]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      if (!ui.errandGuess) ui.errandGuess = {};
      ui.errandGuess.place = btn.dataset.guessBk;
      ui.errandGuess.needBank = false;
      refreshErrandGuessBox();
    };
  });
}
function findPendingCashBook(amount, date) {
  const n = Number(amount) || 0;
  if (!n) return null;
  const t = new Date(ymdOf(date) + "T00:00:00").getTime();
  const window = 16 * 86400000;
  return (state.books || []).find(b => {
    if (!b || !b.pendingBank || b.linkedId) return false;
    if (Number(b.amount) !== n) return false;
    if (String(b.company || "") !== "現金(保險箱)") return false;
    if (b.type === "out") return false;
    const dt = new Date(ymdOf(b.date) + "T00:00:00").getTime();
    return Number.isFinite(dt) && t - dt >= 0 && t - dt <= window;
  }) || null;
}
function guessMetaFromName(name) {
  const s = String(name || "");
  const dm = s.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  const date = dm ? dm[1] + "-" + String(dm[2]).padStart(2, "0") + "-" + String(dm[3]).padStart(2, "0") : "";
  const mm = s.replace(/\.[a-z0-9]+$/i, "").match(/(\d{4,})/);
  const amount = mm ? Number(mm[1]) : 0;
  return { date, amount: amount >= 100 ? amount : 0, company: cellAccount(s) || "", bank: guessBank(s), name: s };
}
function stripHeavyMedia(data) {
  (data.bankSlips || []).forEach(s => {
    if (s.media && s.media.length) {
      const names = s.media.map(m => m.name).filter(Boolean);
      if (names.length) s.summary = names.join("、");
      s.media = [];
    }
  });
  (data.errands || []).forEach(e => {
    if (e.media && e.media.length) {
      const names = e.media.map(m => m.name).filter(Boolean);
      if (names.length) e.summary = names.join("、");
      e.media = [];
    }
  });
}
async function absorbUploadFiles(files, where) {
  const list = [...(files || [])];
  const names = [];
  let sheets = 0;
  for (const f of list) {
    names.push(f.name);
    if (isSheetFile(f)) {
      await importExcelBooks(f);
      sheets++;
    }
  }
  const line = names.length
    ? ("已吸收：" + names.join("、") + (sheets ? "　表單已記入進出帳" : "　只記文字，檔案不留在畫面上"))
    : "";
  if (where === "bank") ui.bankAbsorb = line;
  if (where === "errand") ui.errandAbsorb = line;
  return { names, sheets, meta: names.map(guessMetaFromName), line };
}
function appointLabel(rep) {
  if (!rep.appointAt) return "";
  return `<div class="row"><span class="k">預約時間</span><button type="button" class="linkish appoint-link" data-gcal="${rep.id}">${formatDateTime12(String(rep.appointAt).replace("T", " "))}</button></div>`;
}
function appointBlock(rep) {
  return `<div class="appoint-box">
    <label class="field"><span>預約日期</span>
      <input type="datetime-local" data-appoint="${rep.id}" value="${rep.appointAt || ""}" />
    </label>
    <div class="small appoint-shown">${rep.appointAt ? "已預約 " + formatDateTime12(String(rep.appointAt).replace("T", " ")) : "選擇完成維修的時間"}</div>
  </div>`;
}

let lastRenderPage = "";
let lastRenderRole = "";
function render() {
  try {
    paintApp();
  } catch (err) {
    try { console.error(err); } catch {}
    const root = document.getElementById("app");
    if (root) {
      root.innerHTML = `<div class="gate" style="padding:28px 22px">
        <div class="logo">TONG JIE</div>
        <h1>畫面暫時無法顯示</h1>
        <p class="lead">請再試一次，或回到登入頁。</p>
        <p class="small">${escapeHtml(String((err && err.message) || err || ""))}</p>
        <button class="btn-navy" type="button" id="recover-home">回到登入</button>
      </div>`;
      const btn = document.getElementById("recover-home");
      if (btn) btn.onclick = () => {
        ui.role = null; ui.page = "home"; ui.keepScroll = false; lastRenderRole = ""; lastRenderPage = "";
        try { paintApp(); } catch { location.reload(); }
      };
    }
  }
  hideSplash();
}
function safeBind(fn) {
  try { fn(); } catch (err) { try { console.error(err); } catch {} }
}
function paintApp() {
  persistUi();
  maybeAuditBrowse();
  const pageChanged = ui.role !== lastRenderRole || ui.page !== lastRenderPage;
  if (ui.signing && ui.page === "lease-sign" && !pageChanged) return;
  if (ui.role === "tenant" && !pageChanged && ui.slideLock && Date.now() < ui.slideLock) {
    lastRenderRole = ui.role;
    lastRenderPage = ui.page;
    return;
  }
  const oldAdmin = (document.querySelector(".admin-scroll") || {}).scrollTop || 0;
  const oldTenant = (document.querySelector(".tenant-scroll") || {}).scrollTop || 0;
  const root = document.getElementById("app");
  if (!root) return;
  const guide = notifyGuideHtml();
  const ver = versionFooter();
  const bar = updateBarHtml();
  const theme = themePickerHtml();
  const toastHtml = ui.toast ? `<div class="toast">${escapeHtml(ui.toast)}</div>` : "";
  const sheet = installSheetHtml() + changelogSheetHtml() + personPickSheetHtml() + nearbySheetHtml();
  if (!ui.role) { ui.keepScroll = false; root.innerHTML = bar + toastHtml + gateView() + sheet + ver + guide + theme; safeBind(() => { bindGate(); bindInstallSheet(); bindNotifyGuide(); bindUpdateBar(); bindThemePicker(); }); return; }
  if (ui.role === "admin") {
    const track = document.querySelector(".tabs-track");
    const sc = document.querySelector(".admin-scroll");
    const overlays = ui.updateNotes || ui.installSheet || ui.personPick || ui.nearbyOpen || ui.themeOpen || ui.notifyGuide || toastHtml
      || document.getElementById("update-mask") || document.querySelector(".install-mask") || document.getElementById("theme-mask") || document.getElementById("nearby-mask");
    if (lastRenderRole === "admin" && track && sc && document.querySelector(".shell.admin-wide") && !overlays) {
      document.querySelectorAll(".tabs .tab").forEach(t => {
        const id = t.dataset.admin;
        const on = ui.page === id || (ui.page === "home" && id === "dash") || (id === "rooms" && ui.page === "room-edit") || (id === "logs" && ui.page === "logs");
        t.classList.toggle("on", on);
        t.classList.remove("land");
        t.style.transform = "";
      });
      bindTabPill();
      sc.innerHTML = `<div class="admin-static">${adminBody()}</div>`;
      safeBind(() => {
        bindAdmin();
        bindInstallSheet();
        bindNotifyGuide();
        bindUpdateBar();
        bindThemePicker();
      });
      if (ui.adminJump === "announce-form") {
        const el = document.getElementById("announce-form");
        const top = el ? (el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 8) : 0;
        sc.scrollTop = Math.max(0, top);
      } else if (!pageChanged) {
        sc.scrollTop = oldAdmin;
      } else {
        sc.scrollTop = 0;
      }
      ui.adminJump = "";
      lastRenderRole = ui.role;
      lastRenderPage = ui.page;
      ui.keepScroll = false;
      return;
    }
    root.innerHTML = `${bar}<div class="shell admin-wide">${toastHtml}${adminView()}</div>${sheet}${ver}${guide}${theme}`;
    ui.keepScroll = false;
    safeBind(() => {
      bindAdmin();
      bindInstallSheet();
      bindNotifyGuide();
      bindUpdateBar();
      bindThemePicker();
      bindPullRefresh();
    });
    const sc2 = document.querySelector(".admin-scroll");
    if (sc2) {
      if (ui.adminJump === "announce-form") {
        const el = document.getElementById("announce-form");
        const top = el ? (el.getBoundingClientRect().top - sc2.getBoundingClientRect().top + sc2.scrollTop - 8) : 0;
        sc2.scrollTop = Math.max(0, top);
        requestAnimationFrame(() => { sc2.scrollTop = Math.max(0, top); });
      } else if (!pageChanged) {
        sc2.scrollTop = oldAdmin;
        requestAnimationFrame(() => { sc2.scrollTop = oldAdmin; });
      }
    }
    ui.adminJump = "";
    lastRenderRole = ui.role;
    lastRenderPage = ui.page;
    ui.keepScroll = false;
    return;
  }
  ui.keepScroll = false;
  root.innerHTML = `${bar}<div class="shell">${toastHtml}<div class="tenant-scroll${pageChanged ? "" : " tenant-still"}">${isDevPreview() ? `<div class="preview-banner">開發者預覽租客　測試用、不計入金額<button type="button" class="ghost" id="exit-preview" style="width:auto">返回後台</button></div>` : ""}<div class="zoom-page${pageChanged ? "" : " keep-still"}">${tenantView()}</div></div>${nav()}</div>${sheet}${ver}${guide}${theme}`;
  safeBind(() => {
    bindTenant();
    bindNavPill();
    attachSkyLive();
    bindInstallSheet();
    bindNotifyGuide();
    bindUpdateBar();
    bindThemePicker();
    playRoomHero();
    if (pageChanged) {
      ui.slideLock = Date.now() + 1100;
      requestAnimationFrame(() => requestAnimationFrame(playHomeSlides));
    }
    bindPullRefresh();
  });
  if (!pageChanged) {
    const ts = document.querySelector(".tenant-scroll");
    if (ts) {
      ts.scrollTop = oldTenant;
      requestAnimationFrame(() => { ts.scrollTop = oldTenant; });
    }
  }
  lastRenderRole = ui.role;
  lastRenderPage = ui.page;
}

function installSheetHtml() {
  if (!ui.installSheet) return "";
  const mobile = ui.installSheet === "mobile";
  const framed = (() => { try { return window.self !== window.top; } catch { return true; } })();
  const ua = navigator.userAgent || "";
  const safari = /^((?!chrome|android).)*safari/i.test(ua);
  let body;
  if (mobile) {
    body = framed
      ? "請用手機瀏覽器打開 https://tongjie-app.pages.dev 再安裝。"
      : isIOS()
        ? "請按底部分享鈕，再選「加入主畫面」。"
        : isAndroid()
          ? "請用 Chrome 右上選單，選「安裝應用程式」或「加入主畫面」。"
          : "請用手機 Safari 或 Chrome 打開此網址。Android 點「安裝應用程式」；iPhone 按分享後選「加入主畫面」。";
  } else if (isStandalone()) {
    body = "這台電腦已經安裝過了，可從開始功能表或 Dock 開啟「統潔＆信潔開發」。";
  } else if (framed) {
    body = "請用電腦的 Chrome 或 Edge 打開 https://tongjie-app.pages.dev 後，再點「下載安裝電腦版」。";
  } else if (isIOS() || isAndroid()) {
    body = "請改用電腦的 Chrome 或 Edge 打開 https://tongjie-app.pages.dev 後安裝電腦版。";
  } else if (safari) {
    body = "Safari 請選「檔案 → 加入 Dock」。若要一鍵安裝，請改用 Chrome 或 Edge 打開此網址。";
  } else {
    body = "請用 Chrome 或 Edge：點網址列右側的「安裝」圖示，或右上角 ⋮ → 安裝「統潔＆信潔開發」。安裝後可從開始功能表開啟。";
  }
  return `<div class="install-mask" id="install-mask">
    <div class="install-sheet">
      <div class="label">${mobile ? "下載 App" : "電腦版"}</div>
      <h2>${mobile ? "安裝到手機" : "安裝到電腦"}</h2>
      <p class="small">${escapeHtml(body)}</p>
      <p class="small">網址：https://tongjie-app.pages.dev</p>
      ${deferredInstall && !isIOS() ? `<button class="btn-navy" id="install-try" type="button">立即安裝</button>` : ""}
      <button class="ghost" id="install-close" type="button">關閉</button>
    </div>
  </div>`;
}
function bindInstallSheet() {
  const close = () => { ui.installSheet = ""; render(); };
  const mask = document.getElementById("install-mask");
  if (mask) mask.onclick = e => { if (e.target.id === "install-mask") close(); };
  const btn = document.getElementById("install-close");
  if (btn) btn.onclick = close;
  const tryBtn = document.getElementById("install-try");
  if (tryBtn) tryBtn.onclick = () => installApp(ui.installSheet || "desktop", true);
}
function installCardHtml(label) {
  if (isStandalone()) return "";
  return `<div class="card card-body slide-left" style="margin-top:14px">
    <div class="label">${label}</div>
    <p class="small">Android 與 iPhone／iPad 都可安裝。安裝後從主畫面開啟，有新版本會自動更新。</p>
    <p class="small">Android 用 Chrome 點下方按鈕；iPhone／iPad 請用 Safari 打開，按分享鈕再選「加入主畫面」。</p>
    <button class="btn-navy" id="install-app" type="button">安裝到手機</button>
  </div>`;
}
function desktopInstallCardHtml() {
  return `<div class="card card-body slide-left" style="margin-top:14px">
    <div class="label">電腦版</div>
    <p class="small">Windows／Mac 可用 Chrome 或 Edge 下載安裝，安裝後從開始功能表開啟，有新版本會自動更新。</p>
    <button class="btn-navy" id="install-desktop" type="button">下載安裝電腦版</button>
  </div>`;
}
function gateView() {
  if (ui.page === "tenant-forgot") {
    return `<div class="gate">
      <button class="back slide-right" id="back-gate" type="button">← 返回</button>
      <div class="slide-right">
        <div class="logo">TONG JIE</div>
        <h1>忘記密碼</h1>
        <p class="lead">輸入房號與姓名，核對後顯示登入密碼。</p>
      </div>
      <div class="login-block slide-left">
        <input id="forgot-room" type="text" inputmode="numeric" maxlength="8" placeholder="房號" value="${escapeHtml(ui.loginRoom || "")}" />
        <input id="forgot-name" type="text" placeholder="租客姓名" value="${escapeHtml(ui.forgotName || "")}" />
        ${ui.loginError ? `<div class="err">${escapeHtml(ui.loginError)}</div>` : ""}
        ${ui.foundPass != null ? `<div class="pass-found">${ui.foundPass ? escapeHtml(ui.foundPass) : "尚未設定密碼"}</div>
          <div class="small">${ui.foundPass ? "請用此密碼登入，也可請管理員在後台協助修改。" : "請回登入頁用房號建立密碼。"}</div>` : ""}
        <button class="btn-navy" id="do-forgot" type="button">找回密碼</button>
      </div>
    </div>`;
  }
  if (ui.page === "tenant-setpass") {
    return `<div class="gate">
      <button class="back slide-right" id="back-gate" type="button">← 返回</button>
      <div class="slide-right">
        <div class="logo">TONG JIE</div>
        <h1>設定登入密碼</h1>
        <p class="lead">${escapeHtml(ui.loginRoom || "")} 室第一次登入，請設定密碼，之後進出都要輸入。</p>
      </div>
      <div class="login-block slide-left">
        <input id="set-pass" type="password" maxlength="20" placeholder="設定密碼（至少 4 碼）" />
        <input id="set-pass2" type="password" maxlength="20" placeholder="再輸入一次" />
        ${ui.loginError ? `<div class="err">${escapeHtml(ui.loginError)}</div>` : ""}
        <button class="btn-navy" id="do-setpass" type="button">建立密碼並進入</button>
      </div>
    </div>`;
  }
  if (ui.page === "tenant-login" || ui.page === "admin-login") {
    const isAdmin = ui.page === "admin-login";
    return `<div class="gate">
      <button class="back slide-right" id="back-gate" type="button">← 返回</button>
      <div class="slide-right">
        <div class="logo">TONG JIE</div>
        <h1>${isAdmin ? "管理員登入" : "租客登入"}</h1>
        <p class="lead">${isAdmin ? "請輸入管理員密碼，進入後台" : "請輸入房號與登入密碼。第一次進來請先建立密碼。"}</p>
      </div>
      <div class="login-block slide-left">
        <input id="room-login" type="${isAdmin ? "password" : "text"}" inputmode="numeric" autocomplete="${isAdmin ? "current-password" : "username"}" maxlength="8" placeholder="${isAdmin ? "管理員密碼" : "房號"}" value="${escapeHtml(isAdmin ? (ui.loginAdmin || "") : (ui.loginRoom || ""))}" />
        ${isAdmin ? "" : `<input id="pass-login" type="password" maxlength="20" placeholder="建立密碼" />`}
        ${ui.loginError ? `<div class="err">${escapeHtml(ui.loginError)}</div>` : ""}
        <button class="btn-navy" id="do-login" type="button">${isAdmin ? "進入後台" : "登入"}</button>
        ${isAdmin ? "" : `<button class="forgot-link" id="go-forgot" type="button">忘記密碼</button>`}
      </div>
      ${isAdmin ? desktopInstallCardHtml() + installCardHtml("下載 App") : installCardHtml("下載 App")}
    </div>`;
  }
  return `<div class="gate">
    <div class="slide-right">
      <div class="logo">TONG JIE</div>
      <h1>統潔＆信潔開發有限公司</h1>
      <p class="small"><a href="mailto:jie59056503@gmail.com">jie59056503@gmail.com</a></p>
      <p class="lead">房間、租約、租金與報修，集中在同一個地方管理。</p>
    </div>
    <button class="role-btn slide-left" data-go="tenant-login">
      <strong>我是租客</strong>
      <span>請輸入自己的房號，進入該房間的租約、繳費與報修。</span>
    </button>
    <button class="role-btn slide-left delay" data-go="admin-login">
      <strong>我是管理員</strong>
      <span>請輸入管理員密碼後，查看全部房間、租客與報修</span>
    </button>
  </div>`;
}

function nav() {
  const items = [["home", "home", "首頁"], ["rooms", "room", "房間"], ["lease", "lease", "租約"], ["repair", "fix", "報修"]];
  return `<nav class="nav"><div class="nav-bg"><i></i></div>${items.map(([id, ic, label]) => {
    const unread = !ui.tenantId ? 0
      : id === "home" ? unreadAnnouncements(ui.tenantId).length
      : id === "repair" ? unreadAppoints(ui.tenantId)
      : id === "lease" ? unreadRenewTimes(ui.tenantId)
      : 0;
    const on = ui.page === id || ((ui.page === "room-detail" || ui.page === "parking" || ui.page === "balcony" || ui.page === "trash") && id === "rooms") || (ui.page === "repair-done" && id === "repair") || (ui.page === "pay" && id === "home") || (ui.page === "lease-sign" && id === "lease");
    return `<button type="button" data-page="${id}" class="${on ? "active land" : ""}"><span class="nav-ic">${icon(ic)}</span>${label}${unread ? `<em class="badge-dot badge-dot-only"></em>` : ""}</button>`;
  }).join("")}</nav>`;
}
function bindNavPill() {
  const bar = document.querySelector(".nav");
  const bg = bar && bar.querySelector(".nav-bg");
  const on = bar && bar.querySelector("button.active");
  if (!bar || !bg || !on) return;
  const extra = 6;
  const dest = (scale) => "translate3d(" + Math.max(0, on.offsetLeft - extra / 2) + "px,0,0) scale(" + scale + ")";
  const prev = ui.navPill;
  on.classList.add("land");
  bg.classList.add("land");
  if (prev && prev.x !== on.offsetLeft) {
    bg.style.transition = "none";
    bg.style.width = prev.w + "px";
    bg.style.transform = "translate3d(" + prev.x + "px,0,0) scale(1.22)";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bg.style.transition = "transform .55s cubic-bezier(.22,.82,.22,1), width .55s cubic-bezier(.22,.82,.22,1)";
      bg.style.width = (on.offsetWidth + extra) + "px";
      bg.style.transform = dest(1);
    }));
  } else {
    bg.style.transition = "none";
    bg.style.width = (on.offsetWidth + extra) + "px";
    bg.style.transform = dest(1);
  }
  ui.navPill = { x: Math.max(0, on.offsetLeft - 3), w: on.offsetWidth + 6 };
}

function tenantView() {
  if (ui.page === "rooms") return roomsView();
  if (ui.page === "room-detail") return roomDetailView(ui.roomId || myRoom().id);
  if (ui.page === "parking") return parkingView();
  if (ui.page === "balcony") return balconyView();
  if (ui.page === "trash") return trashView();
  if (ui.page === "lease") return leaseView();
  if (ui.page === "lease-sign") return leaseSignView();
  if (ui.page === "repair" || ui.page === "repair-done") return repairView();
  if (ui.page === "pay") return payView();
  return homeView();
}

function reactionCounts(a) {
  const rec = Object.assign({}, (a && a.reactions) || {});
  if (isDevPreview() && ui.devReactions && ui.devReactions[a.id]) rec[ui.tenantId] = "heart";
  let heart = 0;
  Object.keys(rec).forEach(id => { if (rec[id]) heart++; });
  return { heart };
}
function reactBarHtml(a) {
  const n = reactionCounts(a).heart;
  if (!n) return `<div class="ann-react" data-react-ann="${a.id}" hidden></div>`;
  const mine = ui.tenantId && (((a.reactions || {})[ui.tenantId]) || (isDevPreview() && ui.devReactions && ui.devReactions[a.id]));
  return `<div class="ann-react" data-react-ann="${a.id}"><span data-react-kind="heart" class="${mine ? "on" : ""} has">❤️<em>${n}</em></span></div>`;
}
function startAnnounceEdit(id) {
  const a = (state.announcements || []).find(x => String(x.id) === String(id || ""));
  if (!a) { toast("找不到這則公告"); return; }
  ui.announceEditId = a.id;
  ui.editAnnounceMedia = (a.media || []).slice();
  render();
}
function deleteAnnounce(id) {
  const key = String(id || "");
  state.announcements = (state.announcements || []).filter(a => String(a.id) !== key);
  if (String(ui.announceEditId) === key) { ui.announceEditId = null; ui.editAnnounceMedia = []; }
  save(); render();
}
function cancelAnnounceEdit() {
  ui.announceEditId = null;
  ui.editAnnounceMedia = [];
  render();
}
function saveAnnounceEdit() {
  const title = String((document.getElementById("ann-edit-title") || {}).value || "").trim();
  const body = String((document.getElementById("ann-edit-body") || {}).value || "").trim();
  if (!title || !body) { toast("請填寫標題與內容"); return; }
  const a = (state.announcements || []).find(x => String(x.id) === String(ui.announceEditId));
  if (!a) { toast("找不到這則公告"); cancelAnnounceEdit(); return; }
  a.title = title;
  a.body = body;
  a.media = (ui.editAnnounceMedia || []).slice();
  a.updatedAt = nowStamp();
  ui.announceEditId = null;
  ui.editAnnounceMedia = [];
  save();
  toast("已更新公告");
  render();
}
function announcePosterLabel(a) {
  return String((a && a.postedBy) || "") === "1240" ? "開發者" : "管理員";
}
function announceBodyHtml(a, actions) {
  const unread = ui.tenantId && (isDevPreview() ? !(ui.devReadAnns || {})[a.id] : !(a.readBy || []).includes(ui.tenantId));
  const poster = announcePosterLabel(a);
  return `<div class="ann-head">
      ${staffAvatarHtml("sm", poster)}
      <div class="ann-meta">
        <div class="row"><span class="small">${escapeHtml(poster)}　${formatDateTime12(a.createdAt)}</span>${unread ? `<span class="badge unpaid">新</span>` : ""}</div>
        <div class="k">${escapeHtml(a.title)}</div>
      </div>
    </div>
    <p style="margin:10px 0 0;white-space:pre-wrap">${escapeHtml(a.body)}</p>
    ${repairMediaButtons({ id: a.id, media: a.media || [], photo: null })}
    ${actions || ""}
    ${reactBarHtml(a)}`;
}
function announceCardsHtml() {
  const list = (state.announcements || []).slice().reverse();
  if (!list.length) return `<div class="card card-body slide-left"><div class="empty">目前沒有管理員公告</div></div>`;
  return list.map(a => `<div class="card card-body ann-card" data-read-announce="${a.id}">${announceBodyHtml(a)}</div>`).join("");
}

function homeView() {
  const t = me(); const r = myRoom();
  const left = daysLeft(t.leaseEnd); const pay = payLabel(t);
  const hasAnn = (state.announcements || []).length > 0;
  const announceBlock = `<div class="section-title"><h2 class="slide-right">管理員公告</h2></div><div class="ann-list">${announceCardsHtml()}</div>`;
  return `
    <div class="topbar weather-hero" data-sky="${ui.sky || "cloud"}">
      <div class="hello-card">
        <div class="who-line">
          <label class="avatar" title="上傳大頭貼">${t.avatar ? `<img src="${t.avatar}" alt="">` : defaultAvatarSvg()}<input id="tenant-avatar" type="file" accept="image/*" hidden /></label>
          <div>
            <div class="eyebrow">${ui.devPreview ? "DEVELOPER PREVIEW" : skyLabel(ui.sky)}</div>
            <h1>您好${t.name ? "，" + escapeHtml(t.name) : ""}</h1>
          </div>
        </div>
      </div>
      <button class="back" id="logout-tenant" type="button">${ui.devPreview ? "返回後台" : "登出"}</button>
    </div>
    <div class="screen">
      ${hasAnn ? announceBlock : ""}
      <div class="hero-card">
        <div class="label">我的房間</div>
        <div class="room-name">${r.no}　${r.title}</div>
        <div class="small" style="margin:-8px 0 14px">${escapeHtml(r.note || r.location || roomAddress(r.no))}</div>
        <div class="hero-stats">
          <div class="stat"><div class="label">租約剩餘天數</div><b>${left == null ? "—" : left + " 天"}</b></div>
          <div class="stat"><div class="label">本月租金</div><b>${money(r.rent)}</b></div>
        </div>
        ${tenantContractStatus(t, r) === "unsigned" ? `<button type="button" class="esign-cta" data-page="lease-sign">尚未簽約　點此線上簽署</button>` : ""}
      </div>
      <div class="section-title"><h2 class="slide-right">繳費狀態</h2><span class="slide-left" data-page="lease">看租約</span></div>
      <div class="card card-body slide-left">
        <div class="row"><span class="k">2026 年 8 月租金</span><span class="v">${money(r.rent)}</span></div>
        <div class="row"><span class="k">狀態</span><span class="pay-pill ${pay.cls}" data-page="pay" role="button">${pay.text}</span></div>
        <div class="row"><span class="k">到期日</span><span class="v">每月 ${t.dueDay || 5} 日前</span></div>
      </div>
      <div class="section-title"><h2 class="slide-right">內容</h2></div>
      <div class="btn-row slide-left">
        <button class="ghost" data-page="pay"><span class="btn-ic">${icon("pay")}</span>繳費租金</button>
        <button class="ghost" id="bind-line" type="button"><span class="btn-ic">${icon("line")}</span>綁定 LINE</button>
        <button class="ghost" data-page="rooms"><span class="btn-ic">${icon("room")}</span>房間資訊</button>
        <button class="ghost" id="nearby-spots" type="button"><span class="btn-ic">${icon("pin")}</span>周邊景點</button>
        <button class="btn-navy" data-page="repair">我要報修</button>
      </div>
      ${roomExtrasHtml(r)}
      ${hasAnn ? "" : announceBlock}
    </div>`;
}

function markTenantPaid(via) {
  const t = me(); const r = myRoom();
  if (!t || !r) return;
  t.paid = true;
  t.paidVia = via;
  t.paidAt = nowStamp();
  if (via === "line") t.lineNotified = true;
  save();
  pushPhoneNotify("繳費回報", `${r.no} ${t.name || ""} 已回報繳費（${via === "line" ? "官方 LINE" : "App"}）`, "admin");
}
function linePayMessage() {
  const t = me(); const r = myRoom();
  return `【繳費通知】${r ? r.no : ""} ${t && t.name ? t.name : ""} 已繳本月租金 ${r ? money(r.rent) : ""}\n戶名：統潔＆信潔開發有限公司\n銀行：803 聯邦銀行 高雄分行\n帳號：010100035909`;
}
function payView() {
  const t = me(); const r = myRoom();
  const paid = !!(t && t.paid);
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="home">← 返回</button>
      <div class="eyebrow">PAY</div><h1>繳費租金</h1>
    </div></div>
    <div class="screen">
      <div class="card card-body slide-left">
        <div class="small">本月應繳</div>
        <div style="font-size:26px;font-weight:800;margin:6px 0 4px">${money(r.rent)}</div>
        <div class="small">${r.no}　${escapeHtml(t && t.name ? t.name : "")}</div>
        <div style="margin-top:10px"><span class="pay-pill ${paid ? "paid" : "unpaid"}">${paid ? "本月已繳" : "本月未繳"}</span>
          ${t && t.paidVia === "line" ? `<span class="badge rented" style="margin-left:6px">LINE 已通知</span>` : t && t.paidVia === "app" ? `<span class="badge doing" style="margin-left:6px">App 回報</span>` : ""}</div>
      </div>
      <div class="section-title"><h2 class="slide-right">統潔＆信潔開發有限公司帳戶</h2></div>
      <div class="card card-body slide-left">
        <div class="copy-row no-copy"><span class="k">戶名</span><span class="v">統潔＆信潔開發有限公司</span></div>
        <div class="copy-row"><span class="k">銀行代號</span><span class="v">803</span><button type="button" class="ghost" data-copy="803">複製</button></div>
        <div class="copy-row no-copy"><span class="k">銀行名稱</span><span class="v">聯邦銀行 高雄分行</span></div>
        <div class="copy-row"><span class="k">帳號</span><span class="v">010100035909</span><button type="button" class="ghost" data-copy="010100035909">複製</button></div>
      </div>
      <button type="button" class="btn-navy slide-left" id="mark-paid" style="margin-top:14px" ${paid ? "disabled" : ""}>${paid ? "已回報本月已繳費" : "本月已繳費"}</button>
      <button type="button" class="ghost slide-left" id="line-paid" style="margin-top:8px">${t && t.lineNotified ? "再次到官方 LINE 通知" : "到官方 LINE 通知已繳費"}</button>
      <p class="small slide-left" style="margin-top:12px;padding:0 6px">請先轉帳，再點「本月已繳費」。點官方 LINE 會直接打開統潔開發聊天室並帶入繳費文字，傳送即可。</p>
    </div>`;
}
function roomsView() {
  const mine = myRoom();
  return `<div class="topbar slide-right"><div><div class="eyebrow">ROOMS</div><h1>房間</h1></div></div>
    <div class="screen">
      ${roomTile(mine, true, "room-seq", "images/studio-room.jpg?v=1713")}
      <div class="room-row clickable room-seq s2" data-page="balcony" style="margin-top:12px">
        <img src="images/balcony.jpg?v=1312" alt="公共陽台" />
        <div class="room-row-info">
          <strong>公共陽台</strong>
          <span class="small">曬衣陽台</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
      <div class="room-row clickable room-seq s3" data-page="parking" style="margin-top:12px">
        <img src="images/parking.jpg?v=1312" alt="停車位" />
        <div class="room-row-info">
          <strong>${mine.no}</strong>
          <span class="small">停車位</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
      <div class="room-row clickable room-seq s4" data-page="trash" style="margin-top:12px">
        <img src="images/trash-cart.jpg?v=1312" alt="子母車" />
        <div class="room-row-info">
          <strong>子母車</strong>
          <span class="small">垃圾桶</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
    </div>`;
}

function parkingView() {
  const r = myRoom();
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 返回</button>
      <div class="eyebrow">PARKING</div><h1>停車位</h1>
    </div></div>
    <div class="screen">
      ${amenityVideoHtml("images/parking.mp4?v=1319", "images/parking.jpg?v=1312")}
      <div class="room-row slide-left" style="margin-top:14px">
        <img src="images/parking.jpg?v=1312" alt="停車位" />
        <div class="room-row-info">
          <strong>${r.no}</strong>
          <span class="small">機車停車位</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
      <div class="card card-body slide-left rules" style="margin-top:14px">
        <p>1. 本房已配置一格機車停車位，月費 NT$ 0。</p>
        <p>2. 請停放於劃設格位內，勿占用走道、大門或消防通道。</p>
        <p>3. 離開時請熄火、上鎖，貴重物品請勿留置車上。</p>
        <p>4. 停車區禁止充電改裝、維修或傾倒機油。</p>
        <p>5. 車輛損壞、遺失由車主自行負責，請妥善保管。</p>
      </div>
    </div>`;
}
function trashView() {
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 返回</button>
      <div class="eyebrow">TRASH</div><h1>子母車</h1>
    </div></div>
    <div class="screen">
      ${amenityVideoHtml("images/trash-cart.mp4?v=1319", "images/trash-cart.jpg?v=1312")}
      <div class="room-row slide-left" style="margin-top:14px">
        <img src="images/trash-cart.jpg?v=1312" alt="子母車" />
        <div class="room-row-info">
          <strong>子母車</strong>
          <span class="small">垃圾桶</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
      <div class="card card-body slide-left rules" style="margin-top:14px">
        <div class="row"><span class="k">使用費</span><span class="v">NT$ 0 /月</span></div>
        <p>1. 本棟提供子母車供倒垃圾使用，請愛惜公物。</p>
        <p>2. 一般垃圾請裝袋綁緊後放入；資源回收請分類，勿混丟。</p>
        <p>3. 請於規定清運時間再推至定點，勿提前堆放於走道或大門。</p>
        <p>4. 使用完畢請將子母車推回原位，保持整潔。</p>
        <p>5. 大型廢棄物、電池、油品等請依環保局規定另行處理，禁止投入子母車。</p>
      </div>
    </div>`;
}
function balconyView() {
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 返回</button>
      <div class="eyebrow">BALCONY</div><h1>公共陽台</h1>
    </div></div>
    <div class="screen">
      ${amenityVideoHtml("images/balcony.mp4?v=1319", "images/balcony.jpg?v=1312")}
      <div class="card card-body slide-left rules" style="margin-top:14px">
        <div class="row"><span class="k">使用費</span><span class="v">NT$ 0 /月</span></div>
        <p>1. 公共陽台提供自助洗衣機、乾衣機與曬衣桿，供全體租客使用。</p>
        <p>2. 洗衣機、乾衣機需刷卡扣款，請依機台說明操作。</p>
        <p>3. 使用完畢請立即取走衣物，勿占用機台或曬衣桿。</p>
        <p>4. 請保持陽台整潔，垃圾與洗衣殘渣請自行清理。</p>
        <p>5. 晚上請放低音量，避免影響其他住戶。</p>
      </div>
    </div>`;
}
function roomTile(r, clickable, extraClass, photoSrc) {
  const img = photoSrc ? `<img src="${photoSrc}" alt="${escapeHtml(r.no)}" />` : photoEl(r.photos && r.photos[0], r.no);
  return `<div class="room-row ${extraClass || "slide-left"}" ${clickable ? `data-room="${r.id}"` : ""}>
    ${img}
    <div class="room-row-info">
      <strong>${r.no}</strong>
      <span class="small">${r.title}</span>
      <div class="small">${escapeHtml(r.location || roomAddress(r.no))}</div>
      <div class="price">${r.status === "office" ? "自用辦公室" : `${money(r.rent)} <em>/月</em>`}</div>
    </div>
    <span class="badge ${r.status}">${statusLabel(r.status)}</span>
  </div>`;
}
function roomExtrasHtml(r) {
  if (!r) return "";
  const am = (Array.isArray(r.amenities) && r.amenities.length) ? r.amenities : AMENITIES;
  const util = r.utilities || {};
  const wifi = r.no || "DEMO";
  return `
      <div class="section-title"><h2 class="slide-right">設備</h2></div>
      <div class="chips slide-left">${am.map(a => `<span class="chip">${escapeHtml(a)}</span>`).join("")}</div>
      <div class="section-title"><h2 class="slide-right">水電</h2></div>
      <div class="card card-body slide-left">
        <div class="row"><span class="k">電費</span><span class="v">${escapeHtml(util.electric || "5樓設有自助儲值機可以刷卡儲值")}</span></div>
        <div class="row"><span class="k">水費</span><span class="v">${escapeHtml(util.water || "一年固定 $1,800")}</span></div>
      </div>
      <div class="section-title"><h2 class="slide-right">Wifi</h2></div>
      <div class="card card-body slide-left">
        <div class="row"><span class="k">帳號</span><span class="v">${escapeHtml(wifi)}</span></div>
        <div class="row"><span class="k">密碼</span><span class="v">123456789</span></div>
      </div>`;
}
function findRoom(id) {
  if (isDevPreview()) {
    ensureDevPreview();
    if (!id || id === ui.devRoom.id || id === "r-dev-preview") return ui.devRoom;
  }
  return (state.rooms || []).find(x => x.id === id) || myRoom();
}
function roomDetailView(id) {
  const r = findRoom(id);
  if (!r) return `<div class="screen"><p>找不到房間</p></div>`;
  const photos = (r.photos && r.photos.length) ? r.photos : photosFor(r.no, r.kind);
  const media = r.kind === "factory"
    ? `<div class="photos slide-left">${photos.map(src => photoEl(src, r.no)).join("")}</div>
      <p class="small hint-note">左右滑動可看更多房間照片</p>`
    : amenityVideoHtml("images/studio-room.mp4?v=1316", "images/studio-room.jpg?v=1713");
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 房間</button><h1>${r.no}</h1>
    </div></div>
    <div class="screen">
      ${media}
      <div class="card card-body slide-up" style="margin-top:14px">
        <div class="row"><span class="k">房號</span><span class="v">${r.no}</span></div>
        <div class="row wrap"><span class="k">地址</span><span class="v">${escapeHtml(r.location || roomAddress(r.no))}</span></div>
        ${r.note ? `<div class="row wrap"><span class="k">說明</span><span class="v">${escapeHtml(r.note)}</span></div>` : ""}
        <div class="row"><span class="k">租金</span><span class="v">${r.status === "office" ? "—" : money(r.rent)}</span></div>
        <div class="row"><span class="k">狀態</span><span class="v"><span class="badge ${r.status}">${statusLabel(r.status)}</span></span></div>
      </div>
      ${roomExtrasHtml(r)}
      ${r.kind === "factory" || r.status === "office" ? "" : `<div class="section-title"><h2>使用規範</h2></div>
      <div class="card card-body rules">
        <p>1. 本房為獨立套房，請愛惜房間設備與裝潢。</p>
        <p>2. 房間內禁止抽菸；簡易加熱可以，請勿開放式烹煮油煙。</p>
        <p>3. 垃圾請裝袋後拿到子母車，勿堆在門口或走廊。</p>
        <p>4. 冷氣、熱水器請正常使用，損壞請從 App 報修，勿自行拆修。</p>
        <p>5. 請保持安靜，晚上 9 點後避免大聲喧嘩。</p>
        <p>6. 訪客請由承租人陪同，房間不得轉租或借住。</p>
      </div>`}
    </div>`;
}
function getESign(t) {
  if (isDevPreview()) return ui.devESign || null;
  return (t && t.eSign) || null;
}
function tenantContractStatus(t, r) {
  const es = getESign(t);
  if (es && es.status === "signed") return "signed";
  if (r && r.contractImages && r.contractImages.length) return "paper";
  return "unsigned";
}
function contractStatusLabel(t, r) {
  const s = tenantContractStatus(t, r);
  if (s === "signed") return "電子已簽";
  if (s === "paper") return "紙本已建檔";
  return "尚未簽約";
}
function eContractDocHtml(t, r) {
  const lessor = "統潔＆信潔開發有限公司";
  const firm = r.company || "統潔";
  const es = getESign(t);
  return `<div class="contract-doc">
    <h3>房屋租賃電子合約</h3>
    <p>出租人：${escapeHtml(lessor)}（${escapeHtml(firm)}）</p>
    <p>承租人：${escapeHtml((t && t.name) || "—")}</p>
    <p>身分證字號：${escapeHtml((t && t.idNo) || "（簽署時確認）")}</p>
    <p>聯絡電話：${escapeHtml((t && t.phone) || "—")}</p>
    <p>承租房間：${escapeHtml(r.no || "")}　${escapeHtml(r.title || "套房")}</p>
    <p>房屋地址：${escapeHtml(r.location || roomAddress(r.no))}</p>
    <p>租期：${escapeHtml((t && t.leaseStart) || "—")} 起至 ${escapeHtml((t && t.leaseEnd) || "—")} 止</p>
    <p>每月租金：${money(r.rent)}　押金：${money(r.deposit)}</p>
    <p>繳費日：每月 ${escapeHtml(String((t && t.dueDay) || 5))} 日前</p>
    <h4>使用規範</h4>
    ${(state.houseRules || DEFAULT_RULES).split("\n").filter(x => x.trim()).map(line => `<p>${escapeHtml(line)}</p>`).join("")}
    <p>雙方同意以電子方式簽署本合約，簽署後與紙本合約具相同效力，並由 App 保存簽署紀錄。</p>
    ${es && es.status === "signed" ? `<div class="signed-block"><p>承租人簽名</p><img src="${es.sig}" alt="簽名"><p class="small">簽署時間　${escapeHtml(formatDateTime12(es.at))}</p></div>` : ""}
  </div>`;
}
function leaseView() {
  const t = me(); const r = myRoom(); const left = daysLeft(t.leaseEnd);
  return `<div class="topbar"><div class="slide-right"><div class="eyebrow">LEASE</div><h1>租約</h1></div></div>
    <div class="screen">
      <div class="card card-body slide-left">
        <div class="row"><span class="k">承租房間</span><span class="v">${r.no} ${r.title}</span></div>
        <div class="row wrap"><span class="k">地址</span><span class="v">${escapeHtml(r.location || roomAddress(r.no))}</span></div>
        <div class="row"><span class="k">起租日</span><span class="v">${t.leaseStart || "—"}</span></div>
        <div class="row"><span class="k">到期日</span><span class="v">${t.leaseEnd || "—"}</span></div>
        <div class="row"><span class="k">剩餘天數</span><span class="v">${left == null ? "—" : left + " 天"}</span></div>
        <div class="row"><span class="k">押金</span><span class="v">${money(r.deposit)}</span></div>
        <div class="row"><span class="k">每月租金</span><span class="v">${money(r.rent)}</span></div>
      </div>
      <div class="section-title"><h2 class="slide-right">使用規範</h2></div>
      <div class="card card-body slide-left rules">${(state.houseRules || DEFAULT_RULES).split("\n").filter(x => x.trim()).map(line => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      <div class="section-title">
        <h2>合約書</h2>
        ${(r.contractImages && r.contractImages.length) ? `<button type="button" class="linkish" id="dl-all-contract">下載 PDF</button>` : ""}
      </div>
      ${(() => {
        const st = tenantContractStatus(t, r);
        const es = getESign(t);
        if (st === "unsigned") {
          return `<div class="card card-body">
            <div class="row"><span class="k">合約狀態</span><span class="pay-pill unpaid">尚未簽約</span></div>
            <p class="small" style="margin-top:8px">還沒有紙本或電子合約。點下面可閱讀條款並在手機上簽名。</p>
            <button type="button" class="btn-navy" data-page="lease-sign" style="margin-top:12px">線上簽署電子合約</button>
          </div>`;
        }
        if (st === "signed") {
          return `<div class="card card-body">${eContractDocHtml(t, r)}
            <div class="row" style="margin-top:8px"><span class="k">合約狀態</span><span class="pay-pill paid">電子已簽</span></div>
          </div>`;
        }
        return (r.contractImages && r.contractImages.length)
          ? `<div class="contract-list">${r.contractImages.map((src, i) => `<img src="${src}" alt="合約書" data-contract="${i}">`).join("")}</div>`
          : `<div class="card card-body"><p class="small">管理員尚未上傳此房間的合約書。</p></div>`;
      })()}
      ${t.leaseEnd ? `<p class="small slide-left" style="margin-top:12px;padding:0 6px">合約將於 ${t.leaseEnd} 到期，建議提前 30 天確認是否續約。</p>` : ""}
      ${(() => {
        const pending = (isDevPreview() ? (ui.devRenewals || []) : (state.renewals || [])).filter(x => x.tenantId === t.id && x.status !== "done");
        const cur = pending[pending.length - 1];
        const asked = !!cur;
        return `
      <button type="button" class="btn-navy slide-left" id="ask-renew" style="margin-top:12px" ${asked ? "disabled" : ""}>${asked ? "已送出續約申請" : "我要續約"}</button>
      ${cur && cur.appointAt ? `<div class="card card-body slide-left" style="margin-top:12px">
        <div class="row"><span class="k">簽約時間</span><button type="button" class="linkish appoint-link" data-gcal-renew="${cur.id}">${formatDateTime12(String(cur.appointAt).replace("T", " "))}</button></div>
        <p class="small" style="margin-top:8px">點擊時間可加入 Google 日曆</p>
      </div>` : ""}`;
      })()}
    </div>`;
}
function leaseSignView() {
  const t = me(); const r = myRoom();
  const es = getESign(t);
  if (es && es.status === "signed") {
    return `<div class="topbar"><div>
      <button class="back" data-page="lease">← 返回</button>
      <div class="eyebrow">LEASE</div><h1>電子合約</h1>
    </div></div>
    <div class="screen">
      <div class="card card-body">${eContractDocHtml(t, r)}</div>
    </div>`;
  }
  return `<div class="topbar"><div>
      <button class="back" data-page="lease">← 返回</button>
      <div class="eyebrow">LEASE</div><h1>線上簽署</h1>
    </div></div>
    <div class="screen">
      <div class="card card-body">${eContractDocHtml(t, r)}</div>
      <label class="sign-agree" for="sign-agree"><input id="sign-agree" type="checkbox" ${ui.signAgree ? "checked" : ""} /> 我已閱讀並同意以上租賃條款，願以電子簽名完成本合約。</label>
      <div class="small" style="margin:8px 2px">請在白框內簽名</div>
      <div class="sign-pad-wrap"><canvas id="sign-pad" width="640" height="280"></canvas></div>
      <div class="btn-row" style="margin-top:12px">
        <button type="button" class="ghost" id="sign-clear">清除簽名</button>
        <button type="button" class="btn-navy" id="sign-confirm">確認簽署</button>
      </div>
    </div>`;
}
function deleteRepair(id) {
  const rep = state.repairs.find(x => x.id === id);
  if (!rep) return;
  const roomId = rep.roomId;
  state.repairs = state.repairs.filter(x => x.id !== id);
  if (state.notices) state.notices = state.notices.filter(n => n.repairId !== id);
  syncRoomRepairStatus(roomId);
  save();
  toast("已刪除報修");
  render();
}
function bindRepairDelete() {
  document.querySelectorAll("[data-del-repair]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      deleteRepair(btn.dataset.delRepair);
    };
  });
}
function repairCard(rep, extraClass) {
  return `<div class="card card-body ${extraClass || ""}">
    <div class="row"><span class="k">${rep.type}</span><span class="badge ${rep.status}">${rep.status === "open" ? "待處理" : rep.status === "doing" ? "處理中" : "已完成"}</span></div>
    <div class="small">${formatDateTime12(rep.createdAt)}</div>
    <p style="margin-top:8px">${escapeHtml(rep.note)}</p>
    ${appointLabel(rep)}
    ${repairMediaButtons(rep)}
    <button type="button" class="ghost" data-del-repair="${rep.id}" style="margin-top:8px">刪除報修</button>
  </div>`;
}
function repairView() {
  const mine = (isDevPreview() ? (ui.devRepairs || []) : state.repairs.filter(r => r.tenantId === ui.tenantId)).slice().reverse();
  if (ui.page === "repair-done") {
    return `<div class="topbar"><div class="slide-right"><div class="eyebrow">REPAIR</div><h1>報修</h1></div></div>
      <div class="screen">
        <div class="card card-body slide-left done-box">
          <div class="done-title">已提交報修</div>
          <p class="small">下面已自動出現這筆報修。</p>
          <button class="ghost" id="back-repair" type="button">返回</button>
        </div>
        <div class="section-title"><h2 class="slide-right">我的報修</h2></div>
        ${mine.map((rep, i) => repairCard(rep, i === 0 ? "slide-up-card" : "")).join("")}
      </div>`;
  }
  const types = ["冷氣", "熱水器", "電燈", "冰箱", "網路", "電視"];
  return `<div class="topbar slide-right"><div>
      <div class="eyebrow">REPAIR</div>
      <h1>報修</h1>
    </div></div>
    <div class="screen">
      <div class="slide-left">
      <div id="repair-form">
        <div class="issue-grid">${types.map(tp => `<button type="button" class="issue-opt ${ui.repairType === tp ? "selected" : ""}" data-type="${tp}">${tp}</button>`).join("")}</div>
        <div class="repair-note-box">
          <textarea id="repair-note" name="repair-note" class="repair-note" rows="5" maxlength="800" autocapitalize="sentences" autocomplete="on" placeholder="請描述問題，例如：冷氣不制冷、晚上會滴水…">${escapeHtml(ui.repairNote || "")}</textarea>
        </div>
        <label class="upload">上傳照片/影片<input id="repair-media" type="file" accept="image/*,video/*" multiple hidden /></label>
        <div id="media-preview">${pendingPreviewHtml()}</div>
        <button class="btn-navy" id="submit-repair" type="button">提交報修</button>
      </div>
      </div>
      <div class="section-title"><h2 class="slide-right">我的報修</h2></div>
      ${mine.length ? mine.map(rep => repairCard(rep)).join("") : `<div class="empty">還沒有報修紀錄</div>`}
    </div>`;
}

function adminView() {
  const pages = adminPages();
  return `
    <div class="admin-bar">
      <div><div class="eyebrow">統潔＆信潔開發有限公司</div><h1 style="font-size:24px">${ui.adminCode === "1240" ? "開發者後台" : "管理員後台"}</h1>
      </div>
      ${ui.adminCode === "1240"
        ? `<div class="switch-pair"><button type="button" class="switch-tile" id="logout">登出</button><button type="button" class="switch-tile" id="preview-tenant">租客</button></div>`
        : `<button class="ghost" id="logout" style="width:auto">登出</button>`}
    </div>
    <div class="tabs">
      <div class="tabs-track">
      <div class="tab-bg"></div>
      ${pages.map(([id, label]) => {
        const count = tabBadgeCount(id);
        const on = ui.page === id || (ui.page === "home" && id === "dash") || (id === "rooms" && ui.page === "room-edit") || (id === "logs" && ui.page === "logs");
        return `<button class="tab ${on ? "on" : ""}" data-admin="${id}">${label}${count ? `<em class="badge-dot">${count > 99 ? "99+" : count}</em>` : ""}</button>`;
      }).join("")}
      </div>
    </div>
    <div class="admin-scroll"><div class="admin-static">${adminBody()}</div></div>`;
}
function adminPages() {
  const labels = { dash: "總覽", rooms: "所有資產", tenants: "租客", announce: "公告", repairs: "報修", ai: "工作助手", logs: "日誌" };
  const allowed = ["dash", "rooms", "tenants", "announce", "repairs", "ai"];
  if (ui.adminCode === "1240") allowed.push("logs");
  let ids = [];
  try { ids = JSON.parse(localStorage.getItem(TAB_KEY) || "[]"); } catch { ids = []; }
  if (!ids.length && Array.isArray(state.tabOrder)) ids = state.tabOrder.slice();
  ids = ids.filter(id => allowed.includes(id));
  allowed.forEach(id => { if (!ids.includes(id)) ids.push(id); });
  return ids.map(id => [id, labels[id]]);
}
function bindTabPill() {
  const track = document.querySelector(".tabs-track");
  const bg = track && track.querySelector(".tab-bg");
  const on = track && track.querySelector(".tab.on");
  if (!track || !bg || !on) return;
  const go = () => {
    bg.style.width = on.offsetWidth + "px";
    bg.style.height = on.offsetHeight + "px";
    bg.style.transform = "translate3d(" + on.offsetLeft + "px," + on.offsetTop + "px,0)";
  };
  const prev = ui.tabPill;
  if (!prev) {
    bg.style.transition = "none";
    go();
    requestAnimationFrame(() => {
      bg.style.transition = "transform .45s cubic-bezier(.22,.82,.22,1), width .45s cubic-bezier(.22,.82,.22,1), height .45s cubic-bezier(.22,.82,.22,1)";
    });
  } else {
    bg.style.transition = "transform .45s cubic-bezier(.22,.82,.22,1), width .45s cubic-bezier(.22,.82,.22,1), height .45s cubic-bezier(.22,.82,.22,1)";
    go();
  }
  ui.tabPill = { x: on.offsetLeft, y: on.offsetTop, w: on.offsetWidth, h: on.offsetHeight };
}
function saveTabOrder(ids) {
  try { localStorage.setItem(TAB_KEY, JSON.stringify(ids)); } catch {}
  state.tabOrder = ids.slice();
  save();
}
function bindTabReorder() {
  const bar = document.querySelector(".tabs-track") || document.querySelector(".tabs");
  if (!bar || bar.dataset.reorderBound === "1") return;
  bar.dataset.reorderBound = "1";
  let timer = 0, dragEl = null, startX = 0, armed = false, moved = false, pid = 0, holdY = 0;
  const clear = () => { if (timer) { clearTimeout(timer); timer = 0; } };
  const pt = e => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };
  const follow = x => {
    if (!dragEl) return;
    dragEl.style.transform = "translate3d(" + (x - startX) + "px,0,0) scale(1.08)";
  };
  const onMove = e => {
    if (!dragEl) return;
    const p = pt(e);
    if (!armed) {
      if (Math.hypot(p.x - startX, p.y - holdY) > 30) { clear(); dragEl = null; }
      return;
    }
    if (e.cancelable) e.preventDefault();
    moved = true;
    follow(p.x);
    const center = dragEl.getBoundingClientRect().left + dragEl.offsetWidth / 2;
    const tabs = [...bar.querySelectorAll(".tab")];
    for (const t of tabs) {
      if (t === dragEl) continue;
      const mid = t.getBoundingClientRect().left + t.offsetWidth / 2;
      const from = tabs.indexOf(dragEl);
      const to = tabs.indexOf(t);
      if (from < to && center > mid) {
        const left = dragEl.getBoundingClientRect().left;
        bar.insertBefore(dragEl, t.nextSibling);
        startX += dragEl.getBoundingClientRect().left - left;
        follow(p.x);
        break;
      }
      if (from > to && center < mid) {
        const left = dragEl.getBoundingClientRect().left;
        bar.insertBefore(dragEl, t);
        startX += dragEl.getBoundingClientRect().left - left;
        follow(p.x);
        break;
      }
    }
  };
  const onEnd = () => {
    clear();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("pointerup", onEnd);
    window.removeEventListener("touchend", onEnd);
    window.removeEventListener("pointercancel", onEnd);
    if (dragEl) {
      dragEl.style.transform = "";
      dragEl.classList.remove("dragging");
      if (armed && moved) {
        dragEl.dataset.dragged = "1";
        saveTabOrder([...bar.querySelectorAll(".tab")].map(t => t.dataset.admin));
      }
    }
    bar.classList.remove("sorting");
    armed = false;
    dragEl = null;
    moved = false;
  };
  const arm = () => {
    if (!dragEl) return;
    armed = true;
    bar.classList.add("sorting");
    dragEl.classList.add("dragging");
    try { if (navigator.vibrate) navigator.vibrate(12); } catch {}
    try { dragEl.setPointerCapture(pid); } catch {}
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("touchend", onEnd);
    window.addEventListener("pointercancel", onEnd);
  };
  bar.addEventListener("contextmenu", e => { if (e.target.closest(".tab")) e.preventDefault(); });
  bar.addEventListener("pointerdown", e => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    const p = pt(e);
    startX = p.x; holdY = p.y; pid = e.pointerId;
    armed = false; moved = false; dragEl = tab;
    clear();
    timer = setTimeout(arm, 320);
  });
  bar.addEventListener("pointermove", e => {
    if (armed || !dragEl) return;
    const p = pt(e);
    if (Math.hypot(p.x - startX, p.y - holdY) > 16) { clear(); dragEl = null; }
  }, { passive: true });
  bar.addEventListener("pointerup", onEnd);
  bar.addEventListener("pointercancel", onEnd);
}
function bindAdminPageSwipe() {
  const sc = document.querySelector(".admin-scroll");
  if (!sc || sc.dataset.swipeBound === "1") return;
  sc.dataset.swipeBound = "1";
  let x0 = 0, y0 = 0, on = false;
  sc.addEventListener("touchstart", e => {
    if (e.touches.length !== 1) return;
    if (e.target.closest(".swipe-wrap, .cal-grid, .seg, .tenant-search, .rev-card, .rev-sheet, .rev-zoom, #rev-zoom, form, input, textarea, select, .tabs, label, .ai-block, .card, button")) return;
    x0 = e.touches[0].clientX;
    y0 = e.touches[0].clientY;
    on = true;
  }, { passive: true });
  sc.addEventListener("touchend", e => {
    if (!on) return;
    on = false;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - x0;
    const dy = t.clientY - y0;
    if (Math.abs(dx) < 64 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
    const pages = adminPages().map(p => p[0]);
    let cur = ui.page === "home" || !ui.page ? "dash" : ui.page;
    if (cur === "room-edit" || cur === "invoice") return;
    const i = pages.indexOf(cur);
    if (i < 0) return;
    const next = dx < 0 ? i + 1 : i - 1;
    if (next < 0 || next >= pages.length) return;
    ui.page = pages[next];
    ui.keepScroll = false;
    render();
  }, { passive: true });
}
function tabBadgeCount(id) {
  if (id === "repairs") return state.repairs.filter(r => r.status !== "done").length;
  if (id === "tenants") {
    const unpaid = state.tenants.filter(t => !t.paid).length;
    const renew = (state.renewals || []).filter(x => x.status !== "done").length;
    return unpaid + renew;
  }
  return 0;
}
function updateTabBadges() {
  document.querySelectorAll("[data-admin]").forEach(tab => {
    const n = tabBadgeCount(tab.dataset.admin);
    let em = tab.querySelector(".badge-dot");
    if (!n) { if (em) em.remove(); return; }
    if (!em) { em = document.createElement("em"); em.className = "badge-dot"; tab.appendChild(em); }
    em.textContent = n > 99 ? "99+" : String(n);
  });
}
function adminBody() {
  try {
    const page = ui.page === "home" ? "dash" : ui.page;
    if (page === "rooms") return adminRooms();
    if (page === "room-edit") return adminRoomEdit();
    if (page === "invoice") return adminInvoice();
    if (page === "tenants") return adminTenants();
    if (page === "repairs") return adminRepairs();
    if (page === "ai") return adminAi();
    if (page === "announce") return adminAnnounce();
    if (page === "logs") return ui.adminCode === "1240" ? adminLogs() : adminDash();
    return adminDash();
  } catch (err) {
    try { console.error(err); } catch {}
    return `<div class="card card-body"><h2 class="dash-h">此頁載入失敗</h2><p class="small">${escapeHtml(String((err && err.message) || err || ""))}</p></div>`;
  }
}
function adminLogs() {
  const filter = ui.logFilter || "all";
  let list = (state.auditLogs || []).slice().reverse();
  if (filter === "tenant") list = list.filter(x => logKind(x) === "tenant");
  if (filter === "admin") list = list.filter(x => logKind(x) === "admin");
  if (filter === "dev") list = list.filter(x => logKind(x) === "dev");
  const chips = [["all", "全部"], ["tenant", "租客"], ["admin", "管理員"], ["dev", "開發者"]];
  const picked = ui.logPicked || {};
  const pickedN = list.filter(x => picked[x.id]).length;
  return `<div class="admin-grid list">
    <div class="card card-body">
      <h2 class="dash-h">目前在線</h2>
      <p class="small">開發者、管理員與正在使用 App 的租客。</p>
      <div class="online-board">
        ${onlineStaffHtml()}
        <div class="online-h">租客</div>
        <div id="online-tenants">${onlineTenantLinesHtml()}</div>
      </div>
    </div>
    <div class="card card-body">
      <h2 class="dash-h">操作日誌</h2>
      <p class="small">誰進來、操作了什麼、看了哪一頁、用哪台裝置。僅開發者可見。</p>
      <div class="log-filters">
        ${chips.map(([id, label]) => `<button type="button" class="ghost ${filter === id ? "on" : ""}" data-log-filter="${id}">${label}</button>`).join("")}
      </div>
      <div class="log-filters">
        <button type="button" class="ghost" id="log-all">${pickedN && pickedN === list.length ? "取消全選" : "全選"}</button>
        <button type="button" class="ghost" id="log-del-picked">刪除已選${pickedN ? "（" + pickedN + "）" : ""}</button>
        <button type="button" class="ghost" id="log-del-all">全部刪除</button>
      </div>
      <div class="small" style="margin-top:8px">共 ${list.length} 筆</div>
    </div>
    ${list.length ? list.map(x => {
      const pid = logPresenceId(x);
      const on = pid && isOnline(pid);
      return `
      <div class="card card-body log-card">
        <div class="row">
          <label class="log-check"><input type="checkbox" data-log-pick="${x.id}" ${picked[x.id] ? "checked" : ""}></label>
          <span class="who-mini"><span class="k">${escapeHtml(x.who)}</span>${pid ? `<span class="live-pill${on ? " on" : ""}" data-online="${pid}">${on ? "在線中" : "離線中"}</span>` : ""}</span>
          <span class="small">${escapeHtml(x.at)}</span>
        </div>
        <div class="log-line"><em>操作</em><span>${escapeHtml(x.action)}${x.detail ? " · " + escapeHtml(x.detail) : ""}</span></div>
        <div class="log-line"><em>瀏覽</em><span>${escapeHtml(x.page || "—")}</span></div>
        <div class="log-line"><em>裝置</em><span>${escapeHtml(x.device || "—")}</span></div>
        ${logKind(x) !== "tenant" ? `<div class="log-line"><em>型號</em><span>${escapeHtml(x.model || "—")}</span></div>
        <div class="log-line"><em>地址</em><span>${escapeHtml(x.address || "—")}</span></div>` : ""}
        <button type="button" class="ghost" data-del-log="${x.id}" style="margin-top:10px">刪除</button>
      </div>`;
    }).join("") : `<div class="empty">尚無日誌</div>`}
  </div>`;
}
const AI_BLOCKS = ["plan", "errand", "ai"];
const AI_BLOCK_KEY = "tongjie_ai_blocks";
function loadAiBlockOrder() {
  try {
    const raw = JSON.parse(localStorage.getItem(AI_BLOCK_KEY) || "[]");
    if (!Array.isArray(raw)) return AI_BLOCKS.slice();
    const keep = raw.filter(id => AI_BLOCKS.includes(id));
    return keep.concat(AI_BLOCKS.filter(id => !keep.includes(id)));
  } catch { return AI_BLOCKS.slice(); }
}
function saveAiBlockOrder(ids) {
  try { localStorage.setItem(AI_BLOCK_KEY, JSON.stringify(ids.filter(id => AI_BLOCKS.includes(id)))); } catch {}
}
function aiDragBtn() {
  return `<button type="button" class="ai-drag" aria-label="拖移" title="拖移排序"></button>`;
}
function adminAi() {
  const logs = (state.aiLogs || []).slice(-20);
  const slips = (state.bankSlips || []).slice().reverse();
  const errands = (state.errands || []).filter(e => e.kind !== "doc").slice().reverse();
  const plan = monthlyErrandPlan();
  const parts = {
    plan: `<div class="card card-body">
      <div class="row"><h2 class="dash-h" style="margin:0">本月自動分析</h2>${aiDragBtn()}</div>
      <div class="small">${plan.monthLabel}　依銀行紀錄與收租狀況整理</div>
      ${plan.lines.map(t => `<div class="mini"><span>${escapeHtml(t)}</span></div>`).join("")}
    </div>`,
    errand: `<form class="card card-body tenant-slim${(ui.errandOpen || ui.bankOpen) ? " open" : ""}" id="errand-form" autocomplete="off">
      <div class="row tenant-slim-head">
        <button type="button" class="fold-head" id="errand-fold">
          <span class="k">跑銀行上傳入帳</span>
          <span class="row-end"><span class="fold-caret"></span></span>
        </button>
        ${aiDragBtn()}
      </div>
      <div class="tenant-slim-body">
        <div class="tenant-slim-inner">
          <p class="small" style="margin-top:10px">不用先分類。直接上傳繳費單、收據、存摺或 Excel；系統會預判。只有分不出公司或銀行時，才要點一下。繳費單會當支出記入。</p>
          ${errandGuessHtml(ui.errandGuess)}
          <label class="upload">上傳檔案<input id="errand-photo" type="file" accept="image/*,application/pdf,.xlsx,.xls,.csv,.xml" multiple hidden /></label>
          <div class="small" id="errand-absorb">${escapeHtml(ui.errandAbsorb || "")}</div>
          <button class="btn-navy" type="submit" style="margin-top:10px">登錄這筆</button>
        </div>
      </div>
    </form>
    ${errands.length ? errands.map(e => `
      <div class="card card-body">
        <div class="row"><span class="k">銀行業務 · ${escapeHtml(e.title || "未填事項")}</span><span class="v">${escapeHtml(e.date || "")}</span></div>
        <div class="small">${escapeHtml([e.company, e.place, e.amount ? money(e.amount) : "", e.pendingBank ? "待入銀行" : (e.linkedId ? "已對帳" : ""), e.note, e.summary].filter(Boolean).join(" · "))}</div>
        <button type="button" class="ghost" data-del-errand="${e.id}" style="margin-top:8px">刪除</button>
      </div>`).join("") : ""}
    ${slips.length ? slips.map(s => `
      <div class="card card-body">
        <div class="row"><span class="k">銀行入帳 · ${escapeHtml(s.date || "")}</span><span class="v">${s.amount ? money(s.amount) : "—"}</span></div>
        <div class="small">${escapeHtml([s.company || "統潔", s.note, s.summary].filter(Boolean).join(" · "))}</div>
        <button type="button" class="ghost" data-del-slip="${s.id}" style="margin-top:8px">刪除</button>
      </div>`).join("") : ""}
    ${!errands.length && !slips.length ? `<div class="empty">還沒有銀行紀錄</div>` : ""}`,
    ai: `<div class="card card-body tenant-slim${ui.aiOpen ? " open" : ""}" id="ai-card">
      <div class="row tenant-slim-head">
        <button type="button" class="fold-head" id="ai-fold">
          <span class="k">提問工作助手</span>
          <span class="row-end"><span class="fold-caret"></span></span>
        </button>
        ${aiDragBtn()}
      </div>
      <div class="tenant-slim-body">
        <div class="tenant-slim-inner">
          <div class="small" style="margin-top:10px">可分析報修、未繳、行事曆與銀行習慣，也可上傳實體銀行入帳資料協助對帳。</div>
          <div class="ai-chips">
            <button type="button" class="ghost" data-ai-q="本月該做什麼">本月該做什麼</button>
            <button type="button" class="ghost" data-ai-q="分析銀行業務">分析銀行</button>
            <button type="button" class="ghost" data-ai-q="分析目前報修">分析報修</button>
            <button type="button" class="ghost" data-ai-q="誰還沒繳租金">分析未繳</button>
            <button type="button" class="ghost" data-ai-q="銀行入帳對帳">銀行對帳</button>
          </div>
          <div class="ai-log">${logs.length ? logs.map(m => `<div class="ai-msg ${m.role}"><b>${m.role === "admin" ? "管理員" : "工作助手"}</b><p>${escapeHtml(m.text)}</p></div>`).join("") : `<div class="empty">直接提問，或點上面的分析。</div>`}</div>
          <form id="ai-form">
            <textarea id="ai-q" placeholder="例如：銀行通常哪一天去？這個月誰還沒繳？"></textarea>
            <button class="btn-navy" type="submit">送出問題</button>
          </form>
        </div>
      </div>
    </div>`
  };
  return `<div class="admin-grid list" id="ai-blocks">${loadAiBlockOrder().map(id => `<div class="ai-block" data-ai-block="${id}">${parts[id] || ""}</div>`).join("")}</div>`;
}
function parseErrandDay(e) {
  const m = String(e.date || e.createdAt || "").match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? { y: Number(m[1]), mo: Number(m[2]), d: Number(m[3]), key: m[1] + "-" + m[2] } : null;
}
function typicalDay(list) {
  if (!list.length) return 0;
  const days = list.map(x => x.d).sort((a, b) => a - b);
  return days[Math.floor((days.length - 1) / 2)];
}
function monthlyErrandPlan() {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth() + 1, today = now.getDate();
  const ym = y + "-" + String(m).padStart(2, "0");
  const parsed = (state.errands || []).filter(e => e.kind !== "doc").map(e => Object.assign({}, e, parseErrandDay(e) || {})).filter(x => x.d);
  const banks = parsed;
  const thisBanks = banks.filter(x => x.key === ym);
  const bankDay = typicalDay(banks);
  const unpaid = state.tenants.filter(t => !t.paid).length;
  const openFix = state.repairs.filter(r => r.status !== "done").length;
  const ending = state.tenants.filter(t => String(t.leaseEnd || "").slice(0, 7) === ym);
  const lines = [];
  if (bankDay) {
    if (thisBanks.length) lines.push("銀行業務：過去多在每月 " + bankDay + " 日左右。本月已登錄 " + thisBanks.length + " 筆。");
    else if (today < bankDay) lines.push("銀行業務：依過去紀錄，建議本月 " + bankDay + " 日前完成存提、對帳。");
    else lines.push("銀行業務：慣例約每月 " + bankDay + " 日。本月尚未登錄，建議盡快辦理或補記。");
  } else lines.push("銀行業務：尚無紀錄。上傳照片後按「登錄這筆」，之後會自動抓出每月習慣。");
  const pendingCash = (state.books || []).filter(b => b.pendingBank && !b.linkedId).reduce((s, b) => s + (Number(b.amount) || 0), 0);
  if (pendingCash) lines.push("現金待入銀行：" + money(pendingCash) + "。之後存摺入帳會自動對成轉存，不會重複計算。");
  lines.push("收租：多為每月 5 日前。目前未繳 " + unpaid + " 戶。");
  if (ending.length) lines.push("本月合約到期 " + ending.length + " 戶：" + ending.map(t => {
    const r = state.rooms.find(x => x.id === t.roomId);
    return (r ? r.no : "") + " " + (t.name || "");
  }).join("、") + "，建議提前確認續約。");
  if (openFix) lines.push("報修未完成 " + openFix + " 件，可一併排維修行程。");
  const freq = {};
  parsed.forEach(e => { if (e.title) freq[e.title] = (freq[e.title] || 0) + 1; });
  const top = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 3);
  if (top.length) lines.push("最常辦理：" + top.map(t => t + "（" + freq[t] + " 次）").join("、") + "。");
  return { monthLabel: y + " 年 " + m + " 月", lines, bankDay };
}
function aiAnswer(q) {
  const text = String(q || "").trim();
  const unpaid = state.tenants.filter(t => !t.paid);
  const open = state.repairs.filter(r => r.status !== "done");
  const doing = open.filter(r => r.status === "doing");
  const wait = open.filter(r => r.status !== "doing");
  const cal = calendarItems();
  const slips = state.bankSlips || [];
  const studios = state.rooms.filter(r => r.kind !== "factory" && r.status !== "office");
  const rented = studios.filter(r => r.status === "rented").length;
  const roomHit = text.match(/\d{4}/);
  const lines = [];
  if (/未繳|欠租|誰還沒|繳費|租金/.test(text) || /對帳|銀行|入帳/.test(text)) {
    lines.push("本月未繳 " + unpaid.length + " 戶：");
    lines.push(unpaid.length ? unpaid.map(t => {
      const r = state.rooms.find(x => x.id === t.roomId);
      return (r ? r.no : "") + " " + t.name + " " + money(r ? r.rent : 0);
    }).join("\n") : "目前沒有未繳租客。");
  }
  if (/報修|維修|冷氣|熱水器|電燈/.test(text)) {
    lines.push("報修待處理 " + wait.length + " 件、處理中 " + doing.length + " 件。");
    if (open.length) lines.push(open.slice(0, 8).map(r => {
      const room = state.rooms.find(x => x.id === r.roomId);
      return (room ? room.no : "") + " " + r.type + "（" + (r.status === "doing" ? "處理中" : "待處理") + "）" + (r.note ? "：" + r.note : "");
    }).join("\n"));
  }
  if (/每月該做|該做什麼|行程|銀行業務|跑銀行/.test(text)) {
    const plan = monthlyErrandPlan();
    lines.push(plan.monthLabel + "建議：");
    lines.push(plan.lines.join("\n"));
    const recent = (state.errands || []).filter(e => e.kind !== "doc").slice(-8).reverse();
    if (recent.length) lines.push("最近紀錄：\n" + recent.map(e => (e.date || "") + " 銀行 " + (e.title || "") + (e.place ? " @" + e.place : "")).join("\n"));
  }
  if (/日曆|預約|行事曆|簽約/.test(text)) {
    lines.push(cal.length ? "已排程：\n" + cal.map(ev => ev.sub + "　" + ev.title).join("\n") : "目前沒有維修或續約預約。");
  }
  if (/對帳|銀行|入帳|存摺/.test(text)) {
    const paidAmt = state.tenants.filter(t => t.paid).reduce((s, t) => s + (Number((state.rooms.find(x => x.id === t.roomId) || {}).rent) || 0), 0);
    const slipAmt = slips.reduce((s, x) => s + (Number(x.amount) || 0), 0);
    lines.push("已上傳入帳 " + slips.length + " 筆，合計 " + money(slipAmt) + "。App 已繳合計 " + money(paidAmt) + "。");
    if (slips.length) lines.push(slips.slice(-6).map(s => (s.date || "") + " " + (s.roomNo || "") + " " + (s.amount ? money(s.amount) : "") + " " + (s.note || "")).join("\n"));
    const unmatched = unpaid.filter(t => {
      const r = state.rooms.find(x => x.id === t.roomId);
      return r && !slips.some(s => String(s.roomNo) === String(r.no));
    });
    if (unmatched.length) lines.push("尚未對到入帳的未繳：" + unmatched.map(t => {
      const r = state.rooms.find(x => x.id === t.roomId);
      return r ? r.no : "";
    }).join("、"));
  }
  if (roomHit) {
    const no = roomHit[0];
    const r = state.rooms.find(x => String(x.no) === no);
    const t = r ? state.tenants.find(x => x.roomId === r.id) : null;
    if (r) {
      lines.push(r.no + " " + r.title + "，狀態 " + statusLabel(r.status) + "，租金 " + money(r.rent) + "。");
      if (t) lines.push("租客 " + t.name + "，" + (t.paid ? "本月已繳" : "本月未繳") + "，合約 " + t.leaseStart + " 至 " + t.leaseEnd + "。");
    }
  }
  if (!lines.length) {
    lines.push("目前套房出租 " + rented + "／" + studios.length + "。未繳 " + unpaid.length + " 戶，報修未完成 " + open.length + " 件，已排程 " + cal.length + " 筆，銀行入帳資料 " + slips.length + " 筆。");
    lines.push("可以問：本月該做什麼、分析銀行、誰還沒繳、報修，或輸入房號。");
  }
  return lines.join("\n");
}
function adminAnnounce() {
  const list = (state.announcements || []).slice().reverse();
  const who = ui.adminCode === "1240" ? "開發者" : "管理員";
  const open = !!ui.announceOpen;
  return `<div class="admin-grid list">
    <form class="card card-body tenant-slim${open ? " open" : ""}" id="announce-form" autocomplete="off">
      <button type="button" class="row tenant-slim-head" id="announce-fold">
        <span class="who-mini">${staffAvatarHtml("sm", who)}<span class="k">發布公告</span></span>
        <span class="row-end"><span class="fold-caret"></span></span>
      </button>
      <div class="tenant-slim-body"${open ? "" : " inert"}>
        <div class="tenant-slim-inner">
          <p class="small" style="margin-top:10px">7651 發布顯示管理員，1240 發布顯示開發者。</p>
          <label class="field"><span>標題</span><input id="ann-title" name="title" type="text" placeholder="例如：停水通知" /></label>
          <label class="field"><span>內容</span><textarea id="ann-body" name="body" placeholder="公告內容"></textarea></label>
          <label class="upload">上傳照片/影片<input id="ann-media" type="file" accept="image/*,video/*" multiple hidden /></label>
          <div id="ann-media-preview">${mediaPreviewHtml(ui.announceMedia, "data-del-ann-media")}</div>
          <button class="btn-navy" type="submit">發布公告</button>
        </div>
      </div>
    </form>
    ${list.length ? list.map(a => {
      const editing = String(ui.announceEditId) === String(a.id);
      if (editing) {
        const poster = announcePosterLabel(a);
        return `<div class="card card-body" id="ann-edit-card">
          <div class="ann-head">${staffAvatarHtml("sm", poster)}<div class="ann-meta">
            <div class="small">${escapeHtml(poster)}　${formatDateTime12(a.createdAt)}</div>
            <div class="k">編輯這則公告</div>
          </div></div>
          <form id="ann-edit-form" autocomplete="off">
            <label class="field"><span>標題</span><input id="ann-edit-title" name="title" type="text" value="${escapeHtml(a.title)}" /></label>
            <label class="field"><span>內容</span><textarea id="ann-edit-body" name="body">${escapeHtml(a.body)}</textarea></label>
            <label class="upload">上傳照片/影片<input id="ann-edit-media" type="file" accept="image/*,video/*" multiple hidden /></label>
            <div id="ann-edit-preview">${mediaPreviewHtml(ui.editAnnounceMedia || [], "data-del-edit-ann-media")}</div>
            <div class="ann-actions">
              <button class="btn-navy" type="button" id="ann-edit-save" data-save-announce="${a.id}">儲存</button>
              <button class="ghost" type="button" data-cancel-announce="${a.id}">取消</button>
            </div>
          </form>
        </div>`;
      }
      return `<div class="card card-body">
        ${announceBodyHtml(a, `<div class="ann-actions"><button type="button" class="ghost" data-edit-announce="${a.id}">編輯</button>
            <button type="button" class="ghost" data-del-announce="${a.id}">刪除</button></div>`)}
      </div>`;
    }).join("") : `<div class="empty">還沒有公告</div>`}
    <form class="card card-body" id="rules-form">
      <h2 class="dash-h">使用規範</h2>
      <p class="small">修改後會同步顯示在租客「租約」頁、合約書上方。</p>
      <label class="field"><span>規範內容</span><textarea id="rules-text" name="rules" style="min-height:220px">${escapeHtml(state.houseRules || DEFAULT_RULES)}</textarea></label>
      <button class="btn-navy" type="submit">儲存規範</button>
    </form>
    <div class="card card-body">
      <h2 class="dash-h">官方 LINE</h2>
      <div class="row"><span class="k">帳號</span><span class="v">統潔＆信潔開發有限公司</span></div>
      <div class="row"><span class="k">LINE ID</span><span class="v">${LINE_OA_ID}</span></div>
      <div class="row"><span class="k">Channel ID</span><span class="v">2011285350</span></div>
      <div class="row"><span class="k">Webhook</span><span class="v">已驗證成功</span></div>
      <div class="small" style="margin-top:8px">租客加入 @773zynao 後傳送「房號 姓名」，例如 6821 黃宥宇，就會綁定。</div>
      <a class="ghost" href="${LINE_CHAT_URL}" target="_blank" rel="noopener" style="margin-top:10px;display:block;text-align:center">開啟 LINE 聊天室後台</a>
    </div>
  </div>`;
}
function reportStatus(r) {
  if (r.kind === "factory") return { rented: "使用中", vacant: "空置", repair: "維修中" }[r.status] || r.status;
  return statusLabel(r.status);
}
function xmlEsc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}
function xlsCell(v, style) {
  const n = typeof v === "number" && Number.isFinite(v);
  const st = style ? ` ss:StyleID="${style}"` : "";
  return `<Cell${st}><Data ss:Type="${n ? "Number" : "String"}">${xmlEsc(n ? v : (v == null ? "" : v))}</Data></Cell>`;
}
function xlsRow(vals, styles) {
  return `<Row>${vals.map((v, i) => xlsCell(v, styles && styles[i])).join("")}</Row>`;
}
function xlsSheet(name, headers, rows) {
  const head = `<Row>${headers.map(h => xlsCell(h, "Head")).join("")}</Row>`;
  const body = rows.map(r => `<Row>${r.map(c => xlsCell(c, typeof c === "number" ? "Money" : "")).join("")}</Row>`).join("");
  return `<Worksheet ss:Name="${xmlEsc(name)}"><Table>${head}${body}</Table></Worksheet>`;
}
function reportAccountBundle() {
  ensureReportPeriod();
  const y = ui.reportYear, m = ui.reportMonth;
  const last = new Date(y, m, 0).getDate();
  const mm = String(m).padStart(2, "0");
  const month = { start: y + "-" + mm + "-01", end: y + "-" + mm + "-" + String(last).padStart(2, "0"), label: y + " 年 " + m + " 月" };
  const year = { start: y + "-01-01", end: y + "-12-31", label: y + " 年" };
  const cols = REPORT_ACCOUNTS.map(n => ({
    name: n,
    m: accountStats(n, month.start, month.end),
    y: accountStats(n, year.start, year.end)
  }));
  const people = PERSONAL_PEOPLE.map(p => ({
    name: p,
    m: accountStats(personalKey(p), month.start, month.end),
    y: accountStats(personalKey(p), year.start, year.end)
  }));
  const add = pick => cols.reduce((s, c) => s + pick(c), 0);
  return {
    y, m, month, year, cols, people,
    totals: {
      mIn: add(c => c.m.inn), mOut: add(c => c.m.out), mNet: add(c => c.m.net),
      yIn: add(c => c.y.inn), yOut: add(c => c.y.out), yNet: add(c => c.y.net),
      bal: add(c => c.m.bal)
    }
  };
}
function revenueTableHtml() {
  const d = reportAccountBundle();
  const td = v => `<td class="${v < 0 ? "led-out" : ""}">${money(v)}</td>`;
  const row = (label, pick, cls) => {
    const vals = d.cols.map(pick);
    const tot = vals.reduce((s, x) => s + x, 0);
    return `<tr class="${cls || ""}"><th>${label}</th>${vals.map(td).join("")}${td(tot)}</tr>`;
  };
  return `<div class="rev-sheet">
    <div class="rev-caption">${escapeHtml(d.month.label)}　／　${escapeHtml(d.year.label)}<span class="rev-hint">點擊放大</span></div>
    <div class="rev-card" data-rev-zoom="營收總表" role="button" tabindex="0">
    <table class="rev-table">
      <thead>
        <tr><th>項目</th>${d.cols.map(c => `<th>${escapeHtml(c.name)}</th>`).join("")}<th>合計</th></tr>
      </thead>
      <tbody>
        ${row("當月收入", c => c.m.inn)}
        ${row("當月支出", c => c.m.out)}
        ${row("當月結餘", c => c.m.net)}
        ${row("當年收入", c => c.y.inn)}
        ${row("當年支出", c => c.y.out)}
        ${row("當年結餘", c => c.y.net)}
        ${row("營收總額", c => c.m.bal, "tot")}
      </tbody>
    </table>
    </div>
    <div class="rev-balance">總餘額　${money(d.totals.bal)}</div>
  </div>`;
}
function closeRevZoom() {
  const box = document.getElementById("rev-zoom");
  if (box) box.remove();
  document.body.classList.remove("rev-zooming");
}
function openRevZoom(card, title) {
  closeRevZoom();
  const table = card && card.querySelector("table");
  if (!table) return;
  const wrap = document.createElement("div");
  wrap.className = "lightbox rev-zoom";
  wrap.id = "rev-zoom";
  wrap.innerHTML = `
    <div class="lightbox-bar">
      <button type="button" id="lb-close">關閉</button>
      <span>${escapeHtml(title || "報表")}</span>
      <span class="rev-zoom-tools">
        <button type="button" id="rev-zoom-out">－</button>
        <button type="button" id="rev-zoom-in">＋</button>
      </span>
    </div>
    <div class="rev-zoom-view" id="rev-zoom-view">
      <div class="rev-zoom-inner" id="rev-zoom-inner">${table.outerHTML}</div>
    </div>
    <div class="rev-zoom-hint">雙指放大縮小 · 手機橫放可看全表</div>`;
  document.body.appendChild(wrap);
  document.body.classList.add("rev-zooming");
  wrap.addEventListener("touchstart", e => e.stopPropagation(), { passive: true });
  wrap.addEventListener("touchmove", e => e.stopPropagation(), { passive: true });
  document.getElementById("lb-close").onclick = closeRevZoom;
  wrap.addEventListener("click", e => { if (e.target === wrap) closeRevZoom(); });
  const onKey = e => { if (e.key === "Escape") { closeRevZoom(); window.removeEventListener("keydown", onKey); } };
  window.addEventListener("keydown", onKey);
  const view = document.getElementById("rev-zoom-view");
  const inner = document.getElementById("rev-zoom-inner");
  let scale = 1, x = 0, y = 0;
  const apply = () => { inner.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")"; };
  const setScale = next => { scale = Math.min(4, Math.max(0.55, next)); apply(); };
  document.getElementById("rev-zoom-in").onclick = e => { e.stopPropagation(); setScale(scale * 1.2); };
  document.getElementById("rev-zoom-out").onclick = e => { e.stopPropagation(); setScale(scale / 1.2); };
  view.addEventListener("wheel", e => {
    e.preventDefault();
    setScale(scale * (e.deltaY < 0 ? 1.1 : 0.9));
  }, { passive: false });
  let mode = "", p0 = null, dist0 = 0, s0 = 1, x0 = 0, y0 = 0;
  const pt = t => ({ x: t.clientX, y: t.clientY });
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  view.addEventListener("touchstart", e => {
    e.stopPropagation();
    if (e.touches.length === 2) {
      mode = "pinch";
      dist0 = dist(pt(e.touches[0]), pt(e.touches[1]));
      s0 = scale; x0 = x; y0 = y;
    } else if (e.touches.length === 1) {
      mode = "pan";
      p0 = pt(e.touches[0]);
      x0 = x; y0 = y;
    }
  }, { passive: true });
  view.addEventListener("touchmove", e => {
    e.stopPropagation();
    if (mode === "pinch" && e.touches.length === 2) {
      e.preventDefault();
      setScale(s0 * dist(pt(e.touches[0]), pt(e.touches[1])) / (dist0 || 1));
    } else if (mode === "pan" && e.touches.length === 1) {
      e.preventDefault();
      const p = pt(e.touches[0]);
      x = x0 + p.x - p0.x;
      y = y0 + p.y - p0.y;
      apply();
    }
  }, { passive: false });
  view.addEventListener("touchend", e => { if (!e.touches.length) mode = ""; });
  let lastTap = 0;
  view.addEventListener("click", e => {
    if (e.target.closest("button")) return;
    const now = Date.now();
    if (now - lastTap < 280) {
      if (scale > 1.15) { scale = 1; x = 0; y = 0; } else setScale(2);
      apply();
    }
    lastTap = now;
  });
}
function overallRows() {
  return state.rooms.slice().sort((a, b) => {
    const ka = a.kind === "factory" ? "2" : "1";
    const kb = b.kind === "factory" ? "2" : "1";
    if (ka !== kb) return ka.localeCompare(kb);
    return String(a.no).localeCompare(String(b.no), "zh-Hant");
  }).map(r => {
    const t = state.tenants.find(x => x.roomId === r.id);
    const pay = t ? (t.paid ? "已繳" : "未繳") : "—";
    const line = r.no && lineBindForRoom(r.no) ? ("已綁定" + (lineBindName(r.no) ? " " + lineBindName(r.no) : "")) : "未綁定";
    return {
      r, t,
      row: [
        r.no,
        r.kind === "factory" ? "廠房" : (r.status === "office" ? "辦公室" : "套房"),
        r.kind === "factory" ? (r.group || "") : ((floorNo(r.no) || "—") + "樓"),
        reportStatus(r),
        t ? t.name : (r.manager || "—"),
        t ? (t.phone || "") : "",
        Number(r.rent) || 0,
        pay,
        t ? (t.leaseStart || "") : "",
        t ? (t.leaseEnd || "") : "",
        t ? daysLeft(t.leaseEnd) : "",
        line,
        r.location || ""
      ]
    };
  });
}
function exportOverallReport() {
  const d = reportAccountBundle();
  const heads = ["項目"].concat(d.cols.map(c => c.name), ["合計"]);
  const moneyS = ["Label", "Money", "Money", "Money", "Money", "Money"];
  const totS = ["LabelB", "MoneyB", "MoneyB", "MoneyB", "MoneyB", "MoneyB"];
  const mk = (label, pick, bold) => {
    const vals = d.cols.map(pick);
    const tot = vals.reduce((s, x) => s + x, 0);
    return xlsRow([label].concat(vals, [tot]), bold ? totS : moneyS);
  };
  const colsXml = `<Column ss:Width="92"/>` + heads.slice(1).map(() => `<Column ss:Width="112"/>`).join("");
  const sheet1 = `<Worksheet ss:Name="營收總表"><Table>
${colsXml}
<Row><Cell ss:StyleID="Title" ss:MergeAcross="5"><Data ss:Type="String">統潔＆信潔開發有限公司　整體報表</Data></Cell></Row>
<Row><Cell ss:MergeAcross="5"><Data ss:Type="String">${xmlEsc(d.month.label + "　／　" + d.year.label)}</Data></Cell></Row>
<Row><Cell ss:MergeAcross="5"><Data ss:Type="String">匯出時間 ${xmlEsc(nowStamp())}</Data></Cell></Row>
<Row></Row>
${xlsRow(heads, heads.map(() => "Head"))}
${mk("當月收入", c => c.m.inn)}
${mk("當月支出", c => c.m.out)}
${mk("當月結餘", c => c.m.net)}
${mk("當年收入", c => c.y.inn)}
${mk("當年支出", c => c.y.out)}
${mk("當年結餘", c => c.y.net)}
${mk("營收總額", c => c.m.bal, true)}
<Row></Row>
${xlsRow(["總餘額", d.totals.bal, "", "", "", ""], ["LabelB", "MoneyB", "", "", "", ""])}
</Table></Worksheet>`;
  const pHead = ["成員", "當月收入", "當月支出", "當月結餘", "當年收入", "當年支出", "當年結餘", "營收總額"];
  const pMoney = ["Label", "Money", "Money", "Money", "Money", "Money", "Money", "Money"];
  const pTot = ["LabelB", "MoneyB", "MoneyB", "MoneyB", "MoneyB", "MoneyB", "MoneyB", "MoneyB"];
  const person = d.cols.find(c => c.name === "個人戶") || { m: { inn: 0, out: 0, net: 0, bal: 0 }, y: { inn: 0, out: 0, net: 0 } };
  const peopleRows = d.people.map(p => xlsRow([p.name, p.m.inn, p.m.out, p.m.net, p.y.inn, p.y.out, p.y.net, p.m.bal], pMoney)).join("");
  const peopleTot = xlsRow(["個人戶合計", person.m.inn, person.m.out, person.m.net, person.y.inn, person.y.out, person.y.net, person.m.bal], pTot);
  const sheet2 = `<Worksheet ss:Name="個人戶"><Table>
<Column ss:Width="120"/>${pHead.slice(1).map(() => `<Column ss:Width="100"/>`).join("")}
<Row><Cell ss:StyleID="Title" ss:MergeAcross="7"><Data ss:Type="String">個人戶明細　${xmlEsc(d.month.label)}</Data></Cell></Row>
<Row></Row>
${xlsRow(pHead, pHead.map(() => "Head"))}
${peopleRows}
${peopleTot}
</Table></Worksheet>`;
  const items = overallRows();
  const assetHead = ["房號", "類型", "樓層/組別", "狀態", "租客/管理人", "電話", "月租", "繳費", "起租日", "到期日", "剩餘天數", "LINE", "地址"];
  const repairHead = ["時間", "房號", "租客", "類型", "狀態", "說明", "預約時間"];
  const repairRows = state.repairs.slice().reverse().map(rep => {
    const r = state.rooms.find(x => x.id === rep.roomId);
    const t = state.tenants.find(x => x.id === rep.tenantId);
    const st = rep.status === "open" ? "待處理" : rep.status === "doing" ? "處理中" : "已完成";
    return [formatDateTime12(rep.createdAt), r ? r.no : "", t ? t.name : "", rep.type, st, rep.note || "", rep.appointAt ? formatDateTime12(String(rep.appointAt).replace("T", " ")) : ""];
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles>
  <Style ss:ID="Default"><Alignment ss:Vertical="Center"/><Font ss:FontName="Microsoft JhengHei" ss:Size="11"/></Style>
  <Style ss:ID="Title"><Font ss:FontName="Microsoft JhengHei" ss:Size="16" ss:Bold="1"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="Head"><Font ss:FontName="Microsoft JhengHei" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#3FA89A" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>
  <Style ss:ID="Label"><Font ss:FontName="Microsoft JhengHei" ss:Size="11"/><Alignment ss:Horizontal="Left" ss:Vertical="Center"/></Style>
  <Style ss:ID="LabelB"><Font ss:FontName="Microsoft JhengHei" ss:Size="11" ss:Bold="1"/><Interior ss:Color="#EEF6F4" ss:Pattern="Solid"/><Alignment ss:Horizontal="Left" ss:Vertical="Center"/></Style>
  <Style ss:ID="Money"><Font ss:FontName="Microsoft JhengHei" ss:Size="11"/><NumberFormat ss:Format="#,##0"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/></Style>
  <Style ss:ID="MoneyB"><Font ss:FontName="Microsoft JhengHei" ss:Size="11" ss:Bold="1"/><Interior ss:Color="#EEF6F4" ss:Pattern="Solid"/><NumberFormat ss:Format="#,##0"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/></Style>
</Styles>
${sheet1}
${sheet2}
${xlsSheet("全部資產", assetHead, items.map(x => x.row))}
${xlsSheet("報修", repairHead, repairRows)}
</Workbook>`;
  const blob = new Blob(["\uFEFF" + xml], { type: "application/vnd.ms-excel" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `統潔＆信潔開發有限公司-整體報表-${d.y}年${d.m}月.xls`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("已匯出 Excel");
}
function printOverallReport() {
  document.body.classList.add("print-report");
  const after = () => document.body.classList.remove("print-report");
  window.addEventListener("afterprint", after, { once: true });
  window.print();
  setTimeout(after, 800);
}
function exportMonthCash() {
  ensureCalMonth();
  const y = ui.calYear, m = ui.calMonth;
  const key = y + "-" + String(m).padStart(2, "0");
  const rows = collectLedger().filter(x => x.date.slice(0, 7) === key)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)));
  const inn = rows.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
  const out = rows.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
  const head = ["日期", "類型", "帳戶", "銀行", "金額", "備註"];
  const body = rows.map(x => [x.date, x.type === "in" ? "進帳" : "出帳", accountLabel(x.company || "統潔"), rowBank(x) || "—", x.amount, x.note || ""]);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles>
  <Style ss:ID="Default"><Alignment ss:Vertical="Center"/><Font ss:FontName="Microsoft JhengHei" ss:Size="11"/></Style>
  <Style ss:ID="Title"><Font ss:FontName="Microsoft JhengHei" ss:Size="16" ss:Bold="1"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="Head"><Font ss:FontName="Microsoft JhengHei" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#3FA89A" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>
  <Style ss:ID="Money"><Font ss:FontName="Microsoft JhengHei" ss:Size="11"/><NumberFormat ss:Format="#,##0"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/></Style>
  <Style ss:ID="LabelB"><Font ss:FontName="Microsoft JhengHei" ss:Size="11" ss:Bold="1"/><Interior ss:Color="#EEF6F4" ss:Pattern="Solid"/></Style>
  <Style ss:ID="MoneyB"><Font ss:FontName="Microsoft JhengHei" ss:Size="11" ss:Bold="1"/><Interior ss:Color="#EEF6F4" ss:Pattern="Solid"/><NumberFormat ss:Format="#,##0"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/></Style>
</Styles>
<Worksheet ss:Name="本月進出帳"><Table>
<Column ss:Width="92"/><Column ss:Width="64"/><Column ss:Width="100"/><Column ss:Width="64"/><Column ss:Width="100"/><Column ss:Width="220"/>
<Row><Cell ss:StyleID="Title" ss:MergeAcross="5"><Data ss:Type="String">統潔＆信潔開發有限公司　本月進出帳</Data></Cell></Row>
<Row><Cell ss:MergeAcross="5"><Data ss:Type="String">${xmlEsc(y + " 年 " + m + " 月")}</Data></Cell></Row>
<Row><Cell ss:MergeAcross="5"><Data ss:Type="String">進帳 ${inn.toLocaleString("zh-TW")}　出帳 ${out.toLocaleString("zh-TW")}　結餘 ${(inn - out).toLocaleString("zh-TW")}</Data></Cell></Row>
<Row></Row>
${xlsRow(head, head.map(() => "Head"))}
${body.map(r => xlsRow(r, ["", "", "", "", "Money", ""])).join("")}
${xlsRow(["合計", "", "", "", inn - out, "進帳 " + inn + "　出帳 " + out], ["LabelB", "LabelB", "LabelB", "LabelB", "MoneyB", "LabelB"])}
</Table></Worksheet>
</Workbook>`;
  const blob = new Blob(["\uFEFF" + xml], { type: "application/vnd.ms-excel" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `統潔＆信潔開發有限公司-本月進出帳-${y}年${m}月.xls`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("已匯出 Excel");
}
function printMonthCash() {
  document.body.classList.add("print-cal");
  const after = () => document.body.classList.remove("print-cal");
  window.addEventListener("afterprint", after, { once: true });
  window.print();
  setTimeout(after, 800);
}
function roomCompany(r) {
  const c = String((r && r.company) || "").trim();
  if (/信潔/.test(c)) return "信潔";
  return "統潔";
}
function firmPeriod(key) {
  if (!ui.firmPeriod) ui.firmPeriod = {};
  return ui.firmPeriod[key] === "year" ? "year" : "month";
}
function inFirmPeriod(dateStr, mode) {
  const d = ymdOf(dateStr);
  if (!d) return false;
  const now = new Date();
  if (mode === "year") return d.slice(0, 4) === String(now.getFullYear());
  return d.slice(0, 7) === now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
}
function ledgerCompany(row) {
  const book = (state.books || []).find(b => b.id === row.id);
  if (book && book.company) {
    if (isBookCompany(book.company)) return book.company;
    if (/信潔/.test(book.company)) return "信潔";
    if (/統潔/.test(book.company)) return "統潔";
  }
  const room = state.rooms.find(r => String(r.no) === String(row.roomNo || ""));
  return roomCompany(room || {});
}
function firmTotals(company, mode) {
  let inn = 0, out = 0;
  state.tenants.forEach(t => {
    if (!t.paid) return;
    const room = state.rooms.find(r => r.id === t.roomId);
    if (!room || room.status === "office" || roomCompany(room) !== company) return;
    const date = ymdOf(t.paidAt) || ymdOf(nowStamp());
    if (!inFirmPeriod(date, mode)) return;
    inn += Number(room.rent) || 0;
  });
  collectLedger().forEach(row => {
    if (row.source === "rent") return;
    if (!inFirmPeriod(row.date, mode)) return;
    if (ledgerCompany(row) !== company) return;
    if (row.type === "in") inn += Number(row.amount) || 0;
    else out += Number(row.amount) || 0;
  });
  return { inn, out, net: inn - out };
}
function reportPiesHtml() {
  const b = reportBounds();
  const stats = REPORT_ACCOUNTS.map(n => Object.assign({ name: n }, accountStats(n, b.start, b.end)));
  const joint = accountStats("聯名戶", b.start, b.end);
  const colors = { "統潔": "#3FA89A", "信潔": "#5B8EE8", "個人戶": "#E8896C", "現金(保險箱)": "#8B95A8" };
  const slices = stats.map(s => ({ name: accountLabel(s.name), bal: s.bal, v: Math.max(0, s.bal), color: colors[s.name] || "#8B95A8" }));
  const sum = slices.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  const gap = sum ? 0.7 : 0;
  const stops = [];
  slices.forEach((p, i) => {
    const from = sum ? acc / sum * 100 : 0;
    acc += p.v;
    const to = sum ? acc / sum * 100 : from;
    const end = i === slices.length - 1 ? Math.max(from, to - gap) : Math.max(from, to - gap);
    stops.push(p.color + " " + from + "% " + end + "%");
    if (gap && to > from) stops.push("#ffffff " + end + "% " + to + "%");
  });
  const pieCss = sum
    ? "conic-gradient(from -90deg, " + stops.join(",") + ")"
    : "conic-gradient(from -90deg, #d7d7d7 0 100%)";
  const totIn = stats.reduce((s, x) => s + x.inn, 0) + joint.inn;
  const totOut = stats.reduce((s, x) => s + x.out, 0) + joint.out;
  const flow = totIn + totOut;
  const inPct = flow ? Math.round(totIn / flow * 1000) / 10 : 0;
  const yearOn = ui.reportMode === "year";
  const unit = yearOn ? "年" : "月";
  const toggle = `<button type="button" class="firm-toggle" data-report-mode="${yearOn ? "month" : "year"}">${unit}</button>`;
  const spin = ui.keepScroll ? "" : "spin-in";
  return `<div class="card firm-card">
      <div class="k firm-k"><span>營收總額</span>${toggle}</div>
      <div class="firm-body">
        <div class="pie-wrap">
          <div class="pie ${sum ? "" : "empty"} ${spin}" style="background:${pieCss}"></div>
          <div class="pie-center"></div>
        </div>
        <div class="firm-legend">
          ${slices.map(p => `<div><i style="background:${p.color}"></i><span>${escapeHtml(p.name)}</span><strong>${money(p.bal)}</strong></div>`).join("")}
          <div class="small">${escapeHtml(b.label)}${sum ? "" : " · 尚無營收"}</div>
        </div>
      </div>
    </div>
    <div class="card firm-card">
      <div class="k firm-k"><span>本期收支</span>${toggle}</div>
      <div class="firm-body">
        <div class="pie-wrap">
          <div class="pie ${flow ? "" : "empty"} ${spin}" style="--in:${inPct}"></div>
          <div class="pie-center"></div>
        </div>
        <div class="firm-legend">
          <div class="net-row"><i class="net"></i><span>淨${unit}額</span><strong class="${totIn - totOut >= 0 ? "led-in" : "led-out"}">${money(totIn - totOut)}</strong></div>
          <div><i class="in"></i><span>本期收入</span><strong class="led-in">${money(totIn)}</strong></div>
          <div><i class="out"></i><span>本期支出</span><strong class="led-out">${money(totOut)}</strong></div>
          <div class="small">${escapeHtml(b.label)}${flow ? "" : " · 尚無進出帳"}</div>
        </div>
      </div>
    </div>`;
}
function occBits(rooms) {
  const fix = new Set((state.repairs || []).filter(x => x.status !== "done").map(x => x.roomId));
  const rented = rooms.filter(r => r.status === "rented").length;
  const vacant = rooms.filter(r => r.status === "vacant").length;
  const repairing = rooms.filter(r => r.status === "repair" || fix.has(r.id)).length;
  const occ = rooms.length ? Math.round(rented / rooms.length * 100) : 0;
  return { rented, vacant, repairing, occ, total: rooms.length };
}
function adminDash() {
  const studios = state.rooms.filter(r => r.status !== "office" && r.kind !== "factory" && r.kind !== "store" && !isStoreNo(r.no));
  const factories = state.rooms.filter(r => r.kind === "factory");
  const stores = state.rooms.filter(r => r.kind === "store" || isStoreNo(r.no));
  const studioOcc = occBits(studios);
  const factoryOcc = occBits(factories);
  const storeOcc = occBits(stores);
  const rented = studioOcc.rented;
  const vacant = studioOcc.vacant;
  const repairing = studioOcc.repairing;
  const solarFactory = factories.filter(r => SOLAR_FACTORY_NOS.includes(r.no));
  const solarSites = solarFactory.length + STUDIO_BUILDINGS.length;
  const solarTotal = factories.length + STUDIO_BUILDINGS.length;
  const solarPct = solarTotal ? Math.round(solarSites / solarTotal * 100) : 0;
  const unpaidTenants = state.tenants.filter(t => !t.paid);
  const expiring = state.tenants.map(t => ({ t, days: daysLeft(t.leaseEnd) })).filter(x => x.days != null && x.days <= 90).sort((a, b) => a.days - b.days);
  const soon = expiring.filter(x => x.days <= 60).length;
  const fixes = {
    open: state.repairs.filter(x => x.status === "open").length,
    doing: state.repairs.filter(x => x.status === "doing").length,
    done: state.repairs.filter(x => x.status === "done").length
  };
  const floors = [1, 2, 3, 4, 5].map(fl => {
    const list = studios.filter(r => floorNo(r.no) === fl);
    const full = list.filter(r => r.status === "rented").length;
    return { fl, total: list.length, full, pct: list.length ? Math.round(full / list.length * 100) : 0 };
  });
  const avgRent = studioOcc.rented ? Math.round(studios.filter(r => r.status === "rented").reduce((s, r) => s + r.rent, 0) / studioOcc.rented) : 0;
  return `<div class="dash">
    <div class="firm-grid" id="report-pies">
      ${reportPiesHtml()}
    </div>
    <div class="dash-hero rings">
      <div class="card ring-card ring-stack">
        <div class="ring-row"><div class="ring-wrap"><div class="ring sky ${ui.keepScroll ? "" : "spin-in"} delay" style="--p:${studioOcc.occ}"></div><b>${studioOcc.occ}%</b></div><div><div class="k">套房出租率</div><div class="small">滿租 ${studioOcc.rented} · 空置 ${studioOcc.vacant} · 維修 ${studioOcc.repairing}</div></div></div>
        <div class="ring-row"><div class="ring-wrap"><div class="ring leaf ${ui.keepScroll ? "" : "spin-in"} delay" style="--p:${factoryOcc.occ}"></div><b>${factoryOcc.occ}%</b></div><div><div class="k">廠房出租率</div><div class="small">滿租 ${factoryOcc.rented} · 空置 ${factoryOcc.vacant} · 維修 ${factoryOcc.repairing}</div></div></div>
        <div class="ring-row"><div class="ring-wrap"><div class="ring clay ${ui.keepScroll ? "" : "spin-in"} delay" style="--p:${storeOcc.occ}"></div><b>${storeOcc.occ}%</b></div><div><div class="k">店面出租率</div><div class="small">滿租 ${storeOcc.rented} · 空置 ${storeOcc.vacant} · 維修 ${storeOcc.repairing}</div></div></div>
      </div>
      <div class="card ring-card">
        <div class="ring-wrap"><div class="ring sun ${ui.keepScroll ? "" : "spin-in"} delay" style="--p:${solarPct}"></div><b>${solarPct}%</b></div>
        <div>
          <div class="k">太陽能覆蓋率</div>
          <div class="small">已裝 ${solarSites} · 未裝 ${Math.max(solarTotal - solarSites, 0)}</div>
          <div class="small">套房 4 棟　廠房牛1 五戶</div>
        </div>
      </div>
    </div>
    ${overallReportHtml()}
    ${monthCashHtml()}
    <div class="dash-two">
      <div class="card card-body"><h2 class="dash-h">樓層出租概況</h2>
        ${floors.map(f => `<div class="bar-row"><span>${f.fl}樓</span><div class="bar"><i style="width:${f.pct}%"></i></div><em>${f.full}/${f.total}</em></div>`).join("")}
      </div>
      <div class="card card-body"><h2 class="dash-h">房況與報修</h2>
        <div class="stack">
          <div class="chip-line"><span class="dot rented"></span>滿租 ${rented}</div>
          <div class="chip-line"><span class="dot vacant"></span>空置 ${vacant}</div>
          <div class="chip-line"><span class="dot repair"></span>維修中 ${repairing}</div>
          <div class="chip-line"><span class="dot office"></span>辦公室 1</div>
        </div>
        <div class="fix-pills"><span>待處理 ${fixes.open}</span><span>處理中 ${fixes.doing}</span><span>已完成 ${fixes.done}</span></div>
      </div>
    </div>
    <div class="dash-two">
      <div class="card card-body"><h2 class="dash-h">續約申請</h2>
        ${(state.renewals || []).filter(x => x.status !== "done").length
          ? (state.renewals || []).filter(x => x.status !== "done").slice().reverse().map(x => {
              const room = state.rooms.find(r => r.id === x.roomId);
              const tenant = state.tenants.find(t => t.id === x.tenantId);
              return `<div class="mini clickable" data-admin-room="${x.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(tenant ? tenant.name : "")} · 申請續約</b><span>${x.appointAt ? formatDateTime12(String(x.appointAt).replace("T", " ")) : formatDateTime12(x.createdAt)}</span></div>`;
            }).join("")
          : `<div class="empty">目前沒有續約申請</div>`}
      </div>
      <div class="card card-body"><h2 class="dash-h">未繳租客</h2>
        ${unpaidTenants.length ? unpaidTenants.map(t => {
          const room = state.rooms.find(x => x.id === t.roomId);
          const late = rentOverdueDays();
          return `<div class="mini clickable" data-admin-room="${t.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(t.name)} · ${money(room?.rent || 0)}</b><span class="overdue">${late > 0 ? "逾期 " + late + " 日" : "今日到期"}</span></div>`;
        }).join("") : `<div class="empty">本月已全部收款</div>`}
      </div>
      <div class="card card-body"><h2 class="dash-h">繳費回報</h2>
        ${state.tenants.filter(t => t.paid && (t.paidVia || t.lineNotified)).length
          ? state.tenants.filter(t => t.paid && (t.paidVia || t.lineNotified)).slice().sort((a, b) => String(b.paidAt || "").localeCompare(String(a.paidAt || ""))).map(t => {
              const room = state.rooms.find(x => x.id === t.roomId);
              return `<div class="mini clickable" data-admin-room="${t.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(t.name)}</b><span>${t.lineNotified ? "LINE 已通知" : "App 回報"}</span></div>`;
            }).join("")
          : `<div class="empty">尚無 App／LINE 繳費回報</div>`}
      </div>
      <div class="card card-body"><h2 class="dash-h">90 天內到期（${soon} 戶 60 天內）</h2>
        ${expiring.length ? expiring.slice(0, 8).map(x => {
          const room = state.rooms.find(r => r.id === x.t.roomId);
          return `<div class="mini clickable" data-admin-room="${x.t.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(x.t.name)}</b><span>${x.days < 0 ? "已到期" : x.days + " 天"} · ${x.t.leaseEnd}</span></div>`;
        }).join("") : `<div class="empty">近 90 天沒有到期合約</div>`}
      </div>
    </div>
  </div>`;
}
function adminRoomListHtml(kind) {
  if (kind === "factory") {
    const list = state.rooms.filter(r => r.kind === "factory").slice().sort((a, b) => {
      const ga = FACTORY_GROUP_ORDER.indexOf(a.group);
      const gb = FACTORY_GROUP_ORDER.indexOf(b.group);
      if (ga !== gb) return (ga < 0 ? 99 : ga) - (gb < 0 ? 99 : gb);
      return String(a.no).localeCompare(String(b.no), "zh-Hant");
    });
    if (!list.length) return `<div class="empty">目前沒有廠房</div>`;
    if (!ui.factoryFold) ui.factoryFold = {};
    const groups = [];
    list.forEach(r => {
      const g = r.group || "其他";
      let pack = groups.find(x => x.group === g);
      if (!pack) { pack = { group: g, rooms: [], company: r.company || "", street: r.street || "" }; groups.push(pack); }
      pack.rooms.push(r);
    });
    const allClosed = groups.every(g => ui.factoryFold[g.group]);
    const bar = `<div class="fold-bar">
      <span class="small">點綠色小標可收合分組</span>
      <button type="button" class="ghost" id="factory-all">${allClosed ? "全部展開" : "全部收合"}</button>
    </div>`;
    return bar + groups.map(g => {
      const closed = !!ui.factoryFold[g.group];
      const cards = g.rooms.map(r => {
        const t = state.tenants.find(x => x.id === r.tenantId);
        return `<div class="card item clickable" data-admin-room="${r.id}">
        ${photoEl(r.photos && r.photos[0], r.no)}
        <div><strong>${r.no}</strong>
          <div class="small">${t && t.name ? escapeHtml(t.name) : "尚無租客"}${r.rent ? " · " + money(r.rent) + "／月" : ""}</div>
          <div class="small">${escapeHtml(r.location || "")}${r.manager ? " · " + escapeHtml(r.manager) : ""}</div>
        </div>
        <select class="select-mini" data-status="${r.id}">
          <option value="rented" ${r.status === "rented" ? "selected" : ""}>使用中</option>
          <option value="vacant" ${r.status === "vacant" ? "selected" : ""}>空置</option>
          <option value="repair" ${r.status === "repair" ? "selected" : ""}>維修中</option>
        </select>
      </div>`;
      }).join("");
      return `<button type="button" class="floor-h fold-h${closed ? " closed" : ""}" data-factory-fold="${escapeHtml(g.group)}">${escapeHtml(g.group)}${g.company ? " · " + escapeHtml(g.company) : ""} · ${escapeHtml(g.street)}（${g.rooms.length} 戶）</button>
      <div class="factory-pack${closed ? " folded" : ""}" data-factory-pack="${escapeHtml(g.group)}"${closed ? ' style="height:0"' : ""}><div class="factory-pack-inner">${cards}</div></div>`;
    }).join("");
  }
  if (!ui.studioFold) ui.studioFold = {};
  const groups = STUDIO_BUILDINGS.map(b => {
    const rooms = roomsByFloor().filter(r => (r.kind || "studio") !== "factory" && studioPrefix(r.no) === b.prefix);
    return { ...b, rooms };
  }).filter(g => g.rooms.length);
  if (!groups.length) return `<div class="empty">目前沒有套房</div>`;
  const allClosed = groups.every(g => ui.studioFold[g.prefix]);
  const bar = `<div class="fold-bar">
    <span class="small">點綠色小標可收合分組</span>
    <button type="button" class="ghost" id="studio-all">${allClosed ? "全部展開" : "全部收合"}</button>
  </div>`;
  return bar + groups.map(g => {
    const closed = !!ui.studioFold[g.prefix];
    let lastFloor = "";
    const cards = g.rooms.map(r => {
      const t = state.tenants.find(x => x.id === r.tenantId);
      const floor = floorNo(r.no);
      const head = String(floor) !== lastFloor ? `<div class="floor-h">${floor}樓</div>` : "";
      lastFloor = String(floor);
      return `${head}<div class="card item clickable" data-admin-room="${r.id}">
        ${photoEl("images/studio-room.jpg?v=1713", r.no)}
        <div><strong>${r.no}　${r.title}${r.shop ? "：" + escapeHtml(r.shop) : ""}</strong>
          <div class="small">${r.status === "office" ? "自用 · 統潔開發" : money(r.rent) + "／月"}${r.status === "office" ? "" : (t && t.name ? " · " + t.name : " · 尚無租客")}</div>
        </div>
        <select class="select-mini" data-status="${r.id}">
          <option value="rented" ${r.status === "rented" ? "selected" : ""}>滿租</option>
          <option value="vacant" ${r.status === "vacant" ? "selected" : ""}>空置</option>
          <option value="repair" ${r.status === "repair" ? "selected" : ""}>維修中</option>
          <option value="office" ${r.status === "office" ? "selected" : ""}>辦公室</option>
        </select>
      </div>`;
    }).join("");
    return `<button type="button" class="floor-h fold-h${closed ? " closed" : ""}" data-studio-fold="${g.prefix}">${escapeHtml(g.no)} · ${escapeHtml(g.company)} · ${escapeHtml(g.street)}（${g.rooms.length} 間）</button>
    <div class="factory-pack${closed ? " folded" : ""}" data-studio-pack="${g.prefix}"${closed ? ' style="height:0"' : ""}><div class="factory-pack-inner">${cards}</div></div>`;
  }).join("");
}
function adminRooms() {
  const kind = ui.assetKind === "factory" ? "factory" : "studio";
  return `<div class="admin-grid list">
    <div class="card card-body">
      <div class="seg ${kind === "factory" ? "is-factory" : "is-studio"}" id="asset-kind-seg">
        <i class="seg-bg"></i>
        <button type="button" class="${kind === "studio" ? "on" : ""}" data-asset-kind="studio">套房</button>
        <button type="button" class="${kind === "factory" ? "on" : ""}" data-asset-kind="factory">廠房</button>
      </div>
    </div>
    <div id="asset-list">${adminRoomListHtml(kind)}</div>
  </div>`;
}
function roomIsFactory(r) {
  return !!(r && r.kind === "factory");
}
function normSearch(s) {
  return String(s || "").toLowerCase().replace(/[\s、\-－()]/g, "");
}
function tenantMatchesQ(t, r, q, kind) {
  if (kind === "factory") {
    const parts = [t.name, t.contactName, r && r.group, r && r.no];
    return parts.some(x => normSearch(x).includes(q));
  }
  const parts = [t.name, t.phone, t.contactName, r && r.no];
  return parts.some(x => normSearch(x).includes(q));
}
function tenantSearchPlaceholder(kind) {
  return kind === "factory" ? "搜尋人名、公司名、牛案場" : "搜尋房號、姓名、電話";
}
function tenantListOfKind(kind) {
  const factory = kind === "factory";
  const q = normSearch(ui.tenantQ);
  const list = state.tenants.filter(t => {
    const r = state.rooms.find(x => x.id === t.roomId);
    if (!t || t.placeholder) return false;
    if (!String(t.name || "").trim()) return false;
    if (!r || r.status === "office") return false;
    if (factory ? !roomIsFactory(r) : roomIsFactory(r)) return false;
    if (q && !tenantMatchesQ(t, r, q, factory ? "factory" : "studio")) return false;
    return true;
  }).sort((a, b) => {
    if (!!a.paid !== !!b.paid) return a.paid ? 1 : -1;
    const ra = state.rooms.find(x => x.id === a.roomId);
    const rb = state.rooms.find(x => x.id === b.roomId);
    if (factory) {
      const ga = FACTORY_GROUP_ORDER.indexOf(ra?.group);
      const gb = FACTORY_GROUP_ORDER.indexOf(rb?.group);
      if (ga !== gb) return (ga < 0 ? 99 : ga) - (gb < 0 ? 99 : gb);
    }
    return String(ra?.no || "").localeCompare(String(rb?.no || ""), "zh-Hant");
  });
  return list;
}
function tenantEntriesOfKind(kind) {
  const list = tenantListOfKind(kind);
  if (kind !== "factory") {
    return list.map(t => ({
      key: t.id,
      tenants: [t],
      rooms: [state.rooms.find(x => x.id === t.roomId)].filter(Boolean)
    }));
  }
  const map = new Map();
  const order = [];
  list.forEach(t => {
    const r = state.rooms.find(x => x.id === t.roomId);
    const key = String(t.taxId || "").trim() || String(t.name || "").trim() || t.id;
    if (!map.has(key)) {
      const e = { key, tenants: [], rooms: [] };
      map.set(key, e);
      order.push(e);
    }
    const e = map.get(key);
    e.tenants.push(t);
    if (r) e.rooms.push(r);
  });
  return order;
}
function tenantListInnerHtml(kind) {
  const entries = tenantEntriesOfKind(kind);
  const q = normSearch(ui.tenantQ);
  const renews = q ? [] : (state.renewals || []).filter(x => {
    if (x.status === "done") return false;
    const room = state.rooms.find(r => r.id === x.roomId);
    if (!room || room.status === "office") return false;
    return kind === "factory" ? roomIsFactory(room) : !roomIsFactory(room);
  }).slice().reverse();
  return `${renews.length ? `<div class="card card-body"><h2 class="dash-h">續約申請</h2>${renews.map(x => {
      const room = state.rooms.find(r => r.id === x.roomId);
      const tenant = state.tenants.find(t => t.id === x.tenantId);
      return `<div class="mini"><b>${room ? room.no : ""} ·${escapeHtml(tenant ? tenant.name : "")}</b>
        <button type="button" class="ghost" data-renew-done="${x.id}" style="width:auto">已處理</button></div>
        <div class="small" style="margin-bottom:8px">申請時間 ${formatDateTime12(x.createdAt)}</div>
        <div class="appoint-box">
          <label class="field"><span>簽約時間</span>
            <input type="datetime-local" data-renew-appoint="${x.id}" value="${x.appointAt || ""}" />
          </label>
          <div class="small">${x.appointAt ? "已預約 " + formatDateTime12(String(x.appointAt).replace("T", " ")) : "選擇簽約時間"}</div>
        </div>`;
    }).join("")}</div>` : ""}
    ${entries.length ? entries.map(entry => tenantEntryCardHtml(kind, entry)).join("") : `<div class="empty">${q ? "找不到符合的租客" : (kind === "factory" ? "目前沒有廠房租客" : "目前沒有套房租客")}</div>`}`;
}
function tenantEntryCardHtml(kind, entry) {
  const tenants = entry.tenants || [];
  const rooms = entry.rooms || [];
  const t = tenants[0];
  const r = rooms[0];
  if (!t) return "";
  const foldId = kind === "factory" ? "fg-" + entry.key : t.id;
  const open = !!(ui.tenantOpen && ui.tenantOpen[foldId]);
  const unpaid = tenants.some(x => !x.paid);
  const pay = unpaid ? { text: "本月未繳", cls: "unpaid" } : payLabel(t);
  const nos = rooms.map(x => x.no).filter(Boolean).join("、") || (r ? r.no : "—");
  const sites = [...new Set(rooms.map(x => x.group).filter(Boolean))].join("、");
  const roomRentLine = (tt, rr) => {
    const u = tt.rentUntaxed || (rr && rr.rentUntaxed);
    const tax = (rr && rr.rent) || 0;
    return u ? "未稅 " + money(u) + "　含稅 " + money(tax) : money(tax);
  };
  const rentsSame = tenants.every(tt => {
    const rr = rooms.find(x => x.id === tt.roomId) || r;
    return roomRentLine(tt, rr) === roomRentLine(t, r);
  });
  const leasesSame = tenants.every(tt => (tt.leaseStart || "") === (t.leaseStart || "") && (tt.leaseEnd || "") === (t.leaseEnd || ""));
  const details = `${kind === "factory" && sites ? `<div class="row"><span class="k">案場</span><span class="v">${escapeHtml(sites)}</span></div>` : ""}
      <div class="row wrap"><span class="k">房間</span><span class="v">${escapeHtml(nos)}</span></div>
      ${kind !== "factory" ? `<div class="row"><span class="k">租金</span><span class="v">${r && r.rent ? money(r.rent) : "—"}</span></div>` : ""}
      ${t.paidAt && tenants.length === 1 ? `<div class="row"><span class="k">繳費時間</span><span class="v">${formatDateTime12(t.paidAt)}</span></div>` : ""}
      ${t.paidVia || t.lineNotified ? `<div class="row"><span class="k">繳費回報</span><span class="v">${t.lineNotified || t.paidVia === "line" ? "官方 LINE 已通知" : "App 已回報"}</span></div>` : ""}
      ${kind !== "factory" ? `<div class="row"><span class="k">登入密碼</span><span class="v">${t.loginPass ? escapeHtml(t.loginPass) : "尚未設定"}</span></div>` : ""}
      ${(() => {
        if (kind === "factory" && tenants.length > 1) {
          return tenants.map(tt => {
            const rr = state.rooms.find(x => x.id === tt.roomId);
            const bound = rr && lineBindForRoom(rr.no);
            return `<div class="row" data-line-status="${rr ? rr.no : ""}"><span class="k">LINE　${escapeHtml(rr ? rr.no : "")}</span>${bound ? `<span class="badge rented">已綁定${lineBindName(rr.no) ? " · " + escapeHtml(lineBindName(rr.no)) : ""}</span>` : `<span class="small">尚未綁定</span>`}</div>`;
          }).join("");
        }
        const bound = r && lineBindForRoom(r.no);
        return `<div class="row" data-line-status="${r ? r.no : ""}"><span class="k">LINE</span>${bound ? `<span class="badge rented">已綁定${lineBindName(r.no) ? " · " + escapeHtml(lineBindName(r.no)) : ""}</span>` : `<span class="small">尚未綁定</span>`}</div>`;
      })()}
      <div class="row"><span class="k">電話</span><span class="v">${t.phone || "—"}</span></div>
      ${t.contactName ? `<div class="row"><span class="k">聯絡人</span><span class="v">${escapeHtml(t.contactName)}</span></div>` : ""}
      ${t.taxId ? `<div class="row"><span class="k">統編</span><span class="v">${escapeHtml(t.taxId)}</span></div>` : ""}
      ${t.bankLast5 ? `<div class="row"><span class="k">帳戶後五碼</span><span class="v">${escapeHtml(t.bankLast5)}</span></div>` : ""}
      ${kind === "factory" ? (rentsSame
        ? `<div class="row wrap"><span class="k">月租</span><span class="v">${roomRentLine(t, r)}</span></div>`
        : tenants.map(tt => {
            const rr = state.rooms.find(x => x.id === tt.roomId);
            return `<div class="row wrap"><span class="k">月租　${escapeHtml(rr ? rr.no : "")}</span><span class="v">${roomRentLine(tt, rr)}</span></div>`;
          }).join("")) : ""}
      ${leasesSame
        ? `<div class="row"><span class="k">租期</span><span class="v">${t.leaseStart || "—"} → ${t.leaseEnd || "—"}</span></div>
      <div class="row"><span class="k">剩餘</span><span class="v">${leaseLeftText(t.leaseEnd)}</span></div>`
        : tenants.map(tt => {
            const rr = state.rooms.find(x => x.id === tt.roomId);
            return `<div class="row wrap"><span class="k">租期　${escapeHtml(rr ? rr.no : "")}</span><span class="v">${tt.leaseStart || "—"} → ${tt.leaseEnd || "—"}　${leaseLeftText(tt.leaseEnd)}</span></div>`;
          }).join("")}
      <div class="row"><span class="k">合約</span><span class="pay-pill ${tenantContractStatus(t, r) === "unsigned" ? "unpaid" : "paid"}">${contractStatusLabel(t, r)}</span></div>
      ${t.note && kind === "factory" ? `<div class="row wrap"><span class="k">備註</span><span class="v">${escapeHtml(t.note)}</span></div>` : ""}
      ${tenants.map(tt => {
        const rr = state.rooms.find(x => x.id === tt.roomId);
        const label = tenants.length > 1 && rr ? escapeHtml(rr.no) + "　" : "";
        return `<button class="ghost" data-invoice="${tt.roomId}" style="margin-top:8px">${label}產出發票</button>
      <button class="ghost" data-toggle-pay="${tt.id}" style="margin-top:8px">${label}${tt.paid ? "標記為未繳" : "標記為已繳"}</button>`;
      }).join("")}`;
  return `<div class="swipe-wrap${open ? "" : " slim"}" data-swipe-tenant="${t.id}">
      <div class="swipe-reveal">LINE</div>
      <div class="card card-body clickable swipe-front tenant-slim${open ? " open" : ""}" data-fold-tenant="${escapeHtml(foldId)}">
      <div class="row tenant-slim-head"><span class="who-mini">${avatarHtml(t, "sm")}<span class="k">${escapeHtml(t.name)}</span>${kind !== "factory" ? `<span class="live-dot${isTenantOnline(t.id) ? " on" : ""}" data-online="${t.id}"></span>` : ""}</span><span class="row-end"><span class="pay-pill ${pay.cls}">${pay.text}</span><span class="fold-caret"></span></span></div>
      <div class="tenant-slim-body"><div class="tenant-slim-inner">${details}</div></div>
    </div>
    </div>`;
}
function tenantKindHint(kind) {
  return kind === "factory" ? "已套入統潔／信潔租金表。向左滑可開官方 LINE。" : "向左滑動租客圖卡，可同時打開官方 LINE 私訊視窗。";
}
function setSegSide(seg, rightOn, leftClass, rightClass) {
  if (!seg) return;
  const bg = seg.querySelector(".seg-bg");
  if (bg) {
    bg.style.transition = "";
    bg.style.transform = "";
    bg.style.width = "";
  }
  if (leftClass) seg.classList.toggle(leftClass, !rightOn);
  if (rightClass) seg.classList.toggle(rightClass, !!rightOn);
  const btns = [...seg.querySelectorAll(":scope > button")];
  btns.forEach((b, i) => b.classList.toggle("on", rightOn ? i === 1 : i === 0));
}
function bindSegPills() {
  document.querySelectorAll(".seg .seg-bg").forEach(bg => {
    bg.style.transition = "";
    bg.style.transform = "";
    bg.style.width = "";
  });
}
function bindSegSwipe(seg, onLeft, onRight) {
  if (!seg) return;
  let x0 = 0, y0 = 0, swiping = false;
  seg.addEventListener("pointerdown", e => { x0 = e.clientX; y0 = e.clientY; swiping = false; });
  seg.addEventListener("pointermove", e => {
    if (!x0) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(e.clientY - y0)) swiping = true;
  });
  seg.addEventListener("pointerup", e => {
    const dx = e.clientX - x0;
    x0 = 0;
    if (!swiping) return;
    e.preventDefault();
    if (dx < -24) onRight();
    else if (dx > 24) onLeft();
  });
  seg.addEventListener("click", e => {
    if (swiping) { e.preventDefault(); e.stopPropagation(); swiping = false; }
  }, true);
}
function applyTenantKind(kind) {
  const next = kind === "factory" ? "factory" : "studio";
  if ((ui.tenantKind === "factory" ? "factory" : "studio") === next) {
    const seg = document.getElementById("tenant-kind-seg");
    if (seg) setSegSide(seg, next === "factory", "is-studio", "is-factory");
    return;
  }
  ui.tenantKind = next;
  const seg = document.getElementById("tenant-kind-seg");
  if (seg) {
    setSegSide(seg, next === "factory", "is-studio", "is-factory");
    seg.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.tenantKind === next));
  }
  const hint = document.getElementById("tenant-kind-hint");
  if (hint) hint.textContent = tenantKindHint(next);
  const search = document.getElementById("tenant-search");
  if (search) search.placeholder = tenantSearchPlaceholder(next);
  const box = document.getElementById("tenant-list");
  if (box) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if ((ui.tenantKind === "factory" ? "factory" : "studio") !== next) return;
      box.innerHTML = tenantListInnerHtml(next);
      bindAdminRoomItems();
      bindLineSwipe();
      bindTenantListTools();
      bindTenantFold();
    }));
  }
}
function bindTenantSearch() {
  const inp = document.getElementById("tenant-search");
  if (!inp) return;
  inp.oninput = () => {
    ui.tenantQ = String(inp.value || "");
    const box = document.getElementById("tenant-list");
    if (!box) return;
    const kind = ui.tenantKind === "factory" ? "factory" : "studio";
    box.innerHTML = tenantListInnerHtml(kind);
    bindAdminRoomItems();
    bindLineSwipe();
    bindTenantListTools();
    bindTenantFold();
  };
}
function bindTenantFold() {
  document.querySelectorAll("[data-fold-tenant]").forEach(el => {
    const id = el.dataset.foldTenant;
    if (!id) return;
    el.onclick = e => {
      if (e.target.closest("button,select,a,input")) return;
      if (el.closest(".swipe-wrap") && el.closest(".swipe-wrap").dataset.swiping === "1") return;
      e.preventDefault();
      e.stopPropagation();
      if (!ui.tenantOpen) ui.tenantOpen = {};
      const next = !ui.tenantOpen[id];
      ui.tenantOpen[id] = next;
      el.classList.toggle("open", next);
      const wrap = el.closest(".swipe-wrap");
      if (wrap) {
        wrap.classList.toggle("slim", !next);
        wrap.dataset.swiping = "0";
        const front = wrap.querySelector(".swipe-front");
        if (front) front.style.transform = "";
      }
    };
  });
}
function bindTenantListTools() {
  document.querySelectorAll("#tenant-list [data-invoice]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.invoiceRoomId = btn.dataset.invoice;
      ui.invoiceFrom = "tenants";
      ui.page = "invoice";
      render();
    };
  });
  document.querySelectorAll("#tenant-list [data-toggle-pay]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const t = state.tenants.find(x => x.id === btn.dataset.togglePay);
      if (!t) return;
      t.paid = !t.paid;
      if (t.paid) {
        if (!t.paidAt) t.paidAt = nowStamp();
        if (!t.paidVia) t.paidVia = "app";
      } else {
        t.paidVia = "";
        t.lineNotified = false;
        t.paidAt = "";
      }
      save();
      const box = document.getElementById("tenant-list");
      if (box) {
        box.innerHTML = tenantListInnerHtml(ui.tenantKind === "factory" ? "factory" : "studio");
        bindAdminRoomItems();
        bindLineSwipe();
        bindTenantListTools();
        bindTenantFold();
      } else render();
    };
  });
  document.querySelectorAll("#tenant-list [data-renew-done]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const item = (state.renewals || []).find(x => x.id === btn.dataset.renewDone);
      if (item) {
        item.status = "done";
        save();
        const box = document.getElementById("tenant-list");
        if (box) {
          box.innerHTML = tenantListInnerHtml(ui.tenantKind === "factory" ? "factory" : "studio");
          bindAdminRoomItems();
          bindLineSwipe();
          bindTenantListTools();
          bindTenantFold();
        } else render();
      }
    };
  });
  document.querySelectorAll("#tenant-list [data-renew-appoint]").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = () => {
      const item = (state.renewals || []).find(x => x.id === inp.dataset.renewAppoint);
      if (!item) return;
      item.appointAt = inp.value;
      item.appointRead = !inp.value;
      save();
      const shown = inp.closest(".appoint-box") && inp.closest(".appoint-box").querySelector(".small");
      if (shown) shown.textContent = inp.value ? "已預約 " + formatDateTime12(String(inp.value).replace("T", " ")) : "選擇簽約時間";
      if (inp.value) {
        const room = state.rooms.find(x => x.id === item.roomId);
        pushPhoneNotify("續約簽約時間", `${room ? room.no : ""} ${formatDateTime12(String(inp.value).replace("T", " "))}`, room ? room.no : "tenants");
      }
    };
  });
}
function adminTenants() {
  const kind = ui.tenantKind === "factory" ? "factory" : "studio";
  return `<div class="admin-grid list">
    <div class="card card-body">
      <div class="seg ${kind === "factory" ? "is-factory" : "is-studio"}" id="tenant-kind-seg">
        <i class="seg-bg"></i>
        <button type="button" class="${kind === "studio" ? "on" : ""}" data-tenant-kind="studio">套房租客</button>
        <button type="button" class="${kind === "factory" ? "on" : ""}" data-tenant-kind="factory">廠房租客</button>
      </div>
    </div>
    <div class="card card-body tenant-search">
      <input id="tenant-search" type="search" enterkeyhint="search" placeholder="${tenantSearchPlaceholder(kind)}" value="${escapeHtml(ui.tenantQ || "")}" autocomplete="off" />
    </div>
    <p class="small" id="tenant-kind-hint" style="padding:0 4px">${tenantKindHint(kind)}</p>
    <div id="tenant-list">${tenantListInnerHtml(kind)}</div>
    <div class="line-dock" id="line-dock">
      <div class="line-dock-bar">
        <div>
          <strong>官方 LINE 私訊</strong>
          <div class="small" id="line-dock-who" style="color:#e9fbe9">選擇租客後開啟聊天室</div>
        </div>
        <button type="button" class="ghost" id="line-dock-close" style="width:auto">關閉</button>
      </div>
      <iframe id="line-dock-frame" src="${LINE_CHAT_URL}" title="官方 LINE 聊天室"></iframe>
      <div class="line-dock-fallback">
        <p id="line-dock-note">租客請在官方 LINE 傳送「房號 姓名」，例如 6821 黃宥宇。</p>
        <a class="btn-navy" href="${LINE_CHAT_URL}" target="_blank" rel="noopener">開啟 LINE 聊天室視窗</a>
        <a class="ghost" href="${LINE_OA_URL}" target="_blank" rel="noopener" style="margin-top:8px;display:block;text-align:center">官方帳號 ${LINE_OA_URL.replace("https://","")}</a>
      </div>
    </div>
  </div>`;
}
function adminRepairs() {
  if (!state.repairs.length) return `<div class="empty">目前沒有報修</div>`;
  return `<div class="admin-grid list">${state.repairs.slice().reverse().map(rep => {
    const r = state.rooms.find(x => x.id === rep.roomId);
    const t = state.tenants.find(x => x.id === rep.tenantId);
    return `<div class="card card-body">
      <div class="row"><span class="k">${rep.type} · ${r ? r.no : ""}</span><span class="badge ${rep.status}">${rep.status === "open" ? "待處理" : rep.status === "doing" ? "處理中" : "已完成"}</span></div>
      <div class="small">${escapeHtml(t ? t.name : "")} · ${formatDateTime12(rep.createdAt)}</div>
      <p style="margin:10px 0">${escapeHtml(rep.note)}</p>
      ${repairMediaButtons(rep)}
      ${appointBlock(rep)}
      <div class="seg ${rep.status === "done" ? "is-done" : rep.status === "doing" ? "is-doing" : ""}">
        <i class="seg-bg"></i>
        <button type="button" class="${rep.status === "doing" ? "on" : ""}" data-rep-status="${rep.id}|doing">處理中</button>
        <button type="button" class="${rep.status === "done" ? "on" : ""}" data-rep-status="${rep.id}|done">已完成</button>
      </div>
      <button type="button" class="ghost" data-del-repair="${rep.id}" style="margin-top:8px">刪除報修</button>
    </div>`;
  }).join("")}</div>`;
}
function field(label, name, value, type) {
  if (type === "textarea") return `<label class="field"><span>${label}</span><textarea name="${name}">${escapeHtml(value || "")}</textarea></label>`;
  if (type === "select-status") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="rented" ${value === "rented" ? "selected" : ""}>滿租</option>
    <option value="vacant" ${value === "vacant" ? "selected" : ""}>空置</option>
    <option value="repair" ${value === "repair" ? "selected" : ""}>維修中</option>
    <option value="office" ${value === "office" ? "selected" : ""}>辦公室</option>
  </select></label>`;
  if (type === "select-kind") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="studio" ${value === "studio" ? "selected" : ""}>套房</option>
    <option value="store" ${value === "store" ? "selected" : ""}>店面</option>
    <option value="factory" ${value === "factory" ? "selected" : ""}>廠房</option>
  </select></label>`;
  if (type === "select-paid") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="1" ${value ? "selected" : ""}>本月已繳</option>
    <option value="0" ${!value ? "selected" : ""}>本月未繳</option>
  </select></label>`;
  if (type === "select-paidvia") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="" ${!value ? "selected" : ""}>無</option>
    <option value="app" ${value === "app" ? "selected" : ""}>App 已回報</option>
    <option value="line" ${value === "line" ? "selected" : ""}>官方 LINE 已通知</option>
  </select></label>`;
  return `<label class="field"><span>${label}</span><input name="${name}" type="${type || "text"}" value="${escapeHtml(value ?? "")}" /></label>`;
}
function adminRoomEdit() {
  const r = state.rooms.find(x => x.id === ui.roomId);
  if (!r) return `<div class="empty">找不到房間</div>`;
  const t = state.tenants.find(x => x.id === r.tenantId);
  return `<div class="admin-grid list">
    <form class="card card-body" id="room-edit-form">
      <button class="back" type="button" data-admin="rooms">← 所有資產</button>
      <h2 class="dash-h">${r.no}　${r.title}</h2>
      ${field("房號", "no", r.no)}
      ${field("房間地址", "location", r.location || (r.kind === "factory" ? "" : roomAddress(r.no)))}
      ${field("分組", "group", r.group || "")}
      ${field("路段", "street", r.street || "")}
      ${field("歸屬", "company", r.company || "")}
      ${field("負責人", "manager", r.manager || "")}
      ${field("資產類型", "kind", r.kind || "studio", "select-kind")}
      ${field("房型", "title", r.title)}
      ${field("租金", "rent", r.rent, "text")}
      ${field("押金", "deposit", r.deposit, "text")}
      ${field("狀態", "status", r.status, "select-status")}
      ${field(r.kind === "factory" ? "公司／租客" : "租客姓名", "name", t?.name || "")}
      <div class="who-mini" style="margin:8px 0 12px">
        ${avatarHtml(t, "")}
        <label class="upload" style="flex:1;margin:0">上傳租客大頭貼<input id="tenant-avatar-admin" type="file" accept="image/*" hidden /></label>
      </div>
      ${field("登入密碼", "loginPass", t?.loginPass || "")}
      ${field("電話", "phone", t?.phone || "")}
      ${field("聯絡人", "contactName", t?.contactName || "")}
      ${field("統編", "taxId", t?.taxId || "")}
      ${field("未稅租金", "rentUntaxed", t?.rentUntaxed || r.rentUntaxed || "")}
      ${field("帳戶後五碼", "bankLast5", t?.bankLast5 || "")}
      ${field("身分證字號", "idNo", t?.idNo || "")}
      ${field("通訊地址", "address", t?.address || "")}
      ${field("緊急聯絡人", "emergencyName", t?.emergencyName || "")}
      ${field("緊急電話", "emergencyPhone", t?.emergencyPhone || "")}
      ${field("起租日", "leaseStart", t?.leaseStart, "date")}
      ${field("到期日", "leaseEnd", t?.leaseEnd, "date")}
      ${field("每月繳費日", "dueDay", t?.dueDay || 5)}
      ${field("本月繳費", "paid", t ? t.paid : true, "select-paid")}
      ${field("繳費時間", "paidAt", toDatetimeLocal(t?.paidAt), "datetime-local")}
      ${field("繳費回報", "paidVia", t?.lineNotified ? "line" : (t?.paidVia || ""), "select-paidvia")}
      ${field("備註", "note", t?.note, "textarea")}
      <div class="section-title"><h2>房間照片（${Math.min((r.photos || []).length, 5)}／5）</h2></div>
      <label class="upload">上傳房間照片<input id="room-photo-upload" type="file" accept="image/*" multiple hidden /></label>
      <p class="small">每個房間最多 5 張，第一張會顯示在列表與租客的房間頁。</p>
      <div class="media-preview">${(r.photos || []).map((src, i) => `
        <div class="media-thumb">
          <img src="${src}" alt="房間照片 ${i + 1}">
          <span>第 ${i + 1} 張${i === 0 ? "（封面）" : ""}</span>
          <button type="button" class="ghost" data-del-photo="${i}">刪除</button>
        </div>`).join("")}</div>
      <div class="section-title"><h2>合約書</h2></div>
      ${(() => {
        const ten = state.tenants.find(x => x.id === r.tenantId);
        const st = tenantContractStatus(ten, r);
        const es = ten && ten.eSign;
        return `<div class="card card-body" style="margin-bottom:10px">
          <div class="row"><span class="k">電子合約</span><span class="pay-pill ${st === "unsigned" ? "unpaid" : "paid"}">${contractStatusLabel(ten, r)}</span></div>
          ${st === "signed" && es && es.sig ? `<img src="${es.sig}" alt="簽名" style="width:100%;max-height:120px;object-fit:contain;background:#fff;border-radius:12px;margin-top:8px"><p class="small">簽署時間 ${escapeHtml(formatDateTime12(es.at))}</p>` : `<p class="small" style="margin-top:8px">${st === "unsigned" ? "租客可在 App「租約」頁線上簽署。" : "已有紙本合約圖檔。"}</p>`}
        </div>`;
      })()}
      <label class="upload">上傳合約書圖檔<input id="contract-upload" type="file" accept="image/*" multiple hidden /></label>
      ${!(r.contractImages && r.contractImages.length) ? `<p class="small">上傳後會顯示在租客的「租約」頁。</p>` : ""}
      ${(r.contractImages || []).map((src, i) => `<div><img src="${src}" alt="" style="width:100%;border-radius:12px;margin:8px 0"><button type="button" class="ghost" data-del-contract="${i}">刪除圖檔</button></div>`).join("")}
      <button type="button" class="ghost" data-invoice="${r.id}" style="margin-top:12px">產出發票</button>
      <button class="btn-navy" type="submit" style="margin-top:12px">儲存</button>
    </form>
  </div>`;
}
function saveRoomEdit(form) {
  const r = state.rooms.find(x => x.id === ui.roomId);
  if (!r) return;
  const g = n => form[n] ? form[n].value : "";
  r.no = g("no") || r.no;
  r.location = g("location") || r.location || (r.kind === "factory" ? "" : roomAddress(r.no));
  r.group = g("group");
  r.street = g("street");
  r.company = g("company");
  r.manager = g("manager");
  r.title = g("title") || r.title;
  r.kind = g("kind") || r.kind || "studio";
  r.rent = Number(g("rent")) || r.rent;
  r.deposit = Number(g("deposit")) || r.deposit;
  r.status = g("status") || r.status;
  let t = state.tenants.find(x => x.id === r.tenantId);
  if (!t && g("name")) {
    t = { id: "t" + Date.now(), roomId: r.id, paid: true, leaseStart: "2026-03-01", leaseEnd: "2027-02-28", dueDay: 5 };
    state.tenants.push(t); r.tenantId = t.id;
  }
  if (t) {
    t.name = g("name"); t.phone = g("phone"); t.idNo = g("idNo"); t.address = g("address");
    t.emergencyName = g("emergencyName"); t.emergencyPhone = g("emergencyPhone");
    t.loginPass = String(g("loginPass") || "").trim();
    t.bankLast5 = String(g("bankLast5") || "").trim();
    t.taxId = String(g("taxId") || "").trim();
    t.contactName = String(g("contactName") || "").trim();
    t.rentUntaxed = Number(g("rentUntaxed")) || 0;
    r.rentUntaxed = t.rentUntaxed;
    t.leaseStart = g("leaseStart"); t.leaseEnd = g("leaseEnd");
    t.dueDay = Number(g("dueDay")) || t.dueDay || 5;
    t.paid = g("paid") === "1"; t.note = g("note");
    t.paidAt = fromDatetimeLocal(g("paidAt"));
    t.paidVia = g("paidVia") || "";
    t.lineNotified = t.paidVia === "line";
    if (!t.paidAt && t.paid) t.paidAt = nowStamp();
    if (!t.paid && !t.paidVia) t.lineNotified = false;
  }
  save(); toast("已儲存");
}

function tenantByRoomNo(no) {
  const room = state.rooms.find(r => String(r.no) === String(no));
  if (!room) return { room: null, tenant: null };
  const tenant = state.tenants.find(t => t.id === room.tenantId) || null;
  return { room, tenant };
}
function nameMatch(a, b) {
  const n = s => String(s || "").replace(/\s+/g, "").replace(/、/g, "");
  const x = n(a), y = n(b);
  return !!(x && y && (x === y || x.includes(y) || y.includes(x)));
}
function enterTenant(room, tenant) {
  ui.role = "tenant";
  ui.tenantId = tenant.id;
  ui.roomId = room.id;
  ui.roomNo = room.no;
  ui.page = "home";
  ui.loginError = "";
  ui.loginRoom = "";
  ui.foundPass = null;
  persistUi();
  audit("登入", "房號 " + room.no);
  beatPresence();
  render();
  enablePush().then(() => maybeNudgeNotifies());
  armPushAsk();
}
function tryLogin() {
  const input = document.getElementById("room-login");
  const no = String((input && input.value) || ui.loginAdmin || ui.loginRoom || "")
    .replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/\s+/g, "");
  if (ui.page === "admin-login") {
    ui.loginAdmin = no;
    if (ADMIN_CODES.includes(no)) {
      ui.role = "admin"; ui.adminCode = no; ui.page = "dash"; ui.loginError = ""; ui.loginAdmin = "";
      persistUi();
      audit("登入", "管理員密碼 " + no);
      beatPresence();
      render(); enablePush().then(() => maybeNudgeNotifies()); armPushAsk(); return;
    }
    ui.loginError = no ? "密碼不正確" : "請輸入管理員密碼";
    audit("登入失敗", "嘗試管理員密碼 " + no);
    render(); return;
  }
  if (!no) { ui.loginError = "請輸入房號"; render(); return; }
  const { room, tenant } = tenantByRoomNo(no);
  if (!room) { ui.loginError = "找不到這個房號"; audit("登入失敗", "嘗試房號 " + no); render(); return; }
  if (room.status === "office" || !tenant) {
    ui.loginError = room.status === "office" ? "7651 為辦公室，請改走管理員登入" : "此房號目前沒有租客";
    audit("登入失敗", "嘗試房號 " + no);
    render(); return;
  }
  ui.loginRoom = room.no;
  const pass = String((document.getElementById("pass-login") || {}).value || "").trim();
  if (!tenant.loginPass) {
    ui.page = "tenant-setpass";
    ui.loginError = "";
    render();
    return;
  }
  if (!pass) { ui.loginError = "請輸入登入密碼"; render(); return; }
  if (pass !== String(tenant.loginPass)) {
    ui.loginError = "密碼不正確";
    audit("登入失敗", "房號 " + room.no + " 密碼錯誤");
    render(); return;
  }
  enterTenant(room, tenant);
}
function trySetPass() {
  const p1 = String((document.getElementById("set-pass") || {}).value || "").trim();
  const p2 = String((document.getElementById("set-pass2") || {}).value || "").trim();
  const { room, tenant } = tenantByRoomNo(ui.loginRoom);
  if (!room || !tenant) { ui.loginError = "找不到這個房號"; ui.page = "tenant-login"; render(); return; }
  if (p1.length < 4) { ui.loginError = "密碼至少 4 碼"; render(); return; }
  if (p1 !== p2) { ui.loginError = "兩次輸入的密碼不一致"; render(); return; }
  tenant.loginPass = p1;
  save();
  toast("密碼已建立");
  enterTenant(room, tenant);
}
function tryForgot() {
  const no = String((document.getElementById("forgot-room") || {}).value || "").replace(/\s+/g, "");
  const name = String((document.getElementById("forgot-name") || {}).value || "").trim();
  ui.foundPass = null;
  if (!no || !name) { ui.loginError = "請輸入房號與姓名"; render(); return; }
  const { room, tenant } = tenantByRoomNo(no);
  if (!room || !tenant) { ui.loginError = "找不到這個房號的租客"; render(); return; }
  ui.loginRoom = no;
  ui.forgotName = name;
  if (!nameMatch(tenant.name, name)) { ui.loginError = "姓名不符，請再確認或洽管理員"; render(); return; }
  ui.loginError = "";
  ui.foundPass = tenant.loginPass || "";
  audit("找回密碼", "房號 " + room.no);
  render();
}

function bindGate() {
  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.onclick = () => { ui.page = btn.dataset.go; ui.loginError = ""; ui.foundPass = null; render(); };
  });
  const back = document.getElementById("back-gate");
  if (back) back.onclick = () => {
    if (ui.page === "tenant-setpass" || ui.page === "tenant-forgot") {
      ui.page = "tenant-login"; ui.loginError = ""; ui.foundPass = null; render(); return;
    }
    ui.page = "home"; ui.loginError = ""; ui.loginRoom = ""; ui.foundPass = null; render();
  };
  const input = document.getElementById("room-login");
  if (input) {
    input.onpointerdown = e => { e.stopPropagation(); setTimeout(() => input.focus(), 0); };
    input.onclick = e => { e.stopPropagation(); input.focus(); };
    input.addEventListener("keydown", e => { if (e.key === "Enter") {
      if (ui.page === "admin-login") tryLogin();
      else {
        const pass = document.getElementById("pass-login");
        if (pass) pass.focus();
        else tryLogin();
      }
    }});
    if (ui.page === "admin-login") {
      input.addEventListener("input", () => {
        const v = input.value.replace(/\s+/g, "");
        ui.loginAdmin = v;
        if (v.length >= 4 && ADMIN_CODES.includes(v)) tryLogin();
      });
    }
  }
  document.querySelectorAll(".gate input").forEach(el => {
    el.onpointerdown = e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); };
    el.onclick = e => { e.stopPropagation(); el.focus(); };
  });
  const pass = document.getElementById("pass-login");
  if (pass) pass.addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });
  const doLogin = document.getElementById("do-login");
  if (doLogin) doLogin.onclick = tryLogin;
  const goForgot = document.getElementById("go-forgot");
  if (goForgot) goForgot.onclick = () => { ui.page = "tenant-forgot"; ui.loginError = ""; ui.foundPass = null; render(); };
  const doSet = document.getElementById("do-setpass");
  if (doSet) doSet.onclick = trySetPass;
  const set2 = document.getElementById("set-pass2");
  if (set2) set2.addEventListener("keydown", e => { if (e.key === "Enter") trySetPass(); });
  const doForgot = document.getElementById("do-forgot");
  if (doForgot) doForgot.onclick = tryForgot;
  const forgotName = document.getElementById("forgot-name");
  if (forgotName) forgotName.addEventListener("keydown", e => { if (e.key === "Enter") tryForgot(); });
  const inst = document.getElementById("install-app");
  if (inst) inst.onclick = () => installApp("mobile");
  const desk = document.getElementById("install-desktop");
  if (desk) desk.onclick = () => installApp("desktop");
}
function bindUpdateBar() {
  const btn = document.getElementById("apply-update");
  if (btn) btn.onclick = () => { ui.updateNotes = true; render(); };
  const now = document.getElementById("apply-update-now");
  if (now) now.onclick = e => { e.preventDefault(); e.stopPropagation(); applyAppUpdate(); };
  const close = document.getElementById("update-close");
  if (close) close.onclick = () => { ui.updateNotes = false; render(); };
  const mask = document.getElementById("update-mask");
  if (mask) mask.onclick = e => { if (e.target.id === "update-mask") { ui.updateNotes = false; render(); } };
}

function bindTenant() {
  const out = document.getElementById("logout-tenant");
  if (out) out.onclick = () => {
    if (isDevPreview()) { exitDevPreview(); return; }
    audit("登出", "登出"); clearSession(); render();
  };
  const exitPrev = document.getElementById("exit-preview");
  if (exitPrev) exitPrev.onclick = () => exitDevPreview();
  const av = document.getElementById("tenant-avatar");
  if (av) av.onchange = async () => {
    const f = av.files && av.files[0];
    av.value = "";
    if (!f) return;
    const t = me();
    if (!t) return;
    try {
      t.avatar = await compressImage(f, 480);
      save();
      toast("大頭貼已更新");
      render();
    } catch { toast("照片讀取失敗"); }
  };
  document.querySelectorAll(".nav [data-page]").forEach(el => {
    el.addEventListener("pointerdown", () => {
      el.style.transition = "transform .38s cubic-bezier(.22,.82,.22,1)";
      el.style.transform = "scale(1.22)";
      const ic = el.querySelector(".nav-ic");
      if (ic) {
        ic.style.transition = "transform .38s cubic-bezier(.22,.82,.22,1)";
        ic.style.transform = "scale(1.7)";
      }
      const inner = document.querySelector(".nav-bg i");
      if (inner) {
        inner.style.transition = "transform .38s cubic-bezier(.22,.82,.22,1)";
        inner.style.transform = "scale(1.22)";
      }
    });
  });
  document.querySelectorAll("[data-page]").forEach(el => {
    el.onclick = () => {
      const next = el.dataset.page;
      if (next === ui.page && !el.closest(".nav")) return;
      if (el.closest(".nav")) {
        const on = document.querySelector(".nav button.active");
        if (on) ui.navPill = { x: Math.max(0, on.offsetLeft - 3), w: on.offsetWidth + 6 };
        lastRenderPage = "__anim__";
      }
      ui.page = next;
      if (ui.page === "repair" && ui.tenantId) {
        let changed = false;
        state.repairs.forEach(r => {
          if (r.tenantId === ui.tenantId && r.appointAt && !r.appointRead) { r.appointRead = true; changed = true; }
        });
        if (changed) save();
      }
      if (ui.page === "lease" && ui.tenantId) {
        let changed = false;
        (state.renewals || []).forEach(x => {
          if (x.tenantId === ui.tenantId && x.appointAt && !x.appointRead) { x.appointRead = true; changed = true; }
        });
        if (changed) save();
      }
      render();
    };
  });
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.onclick = async e => {
      e.preventDefault(); e.stopPropagation();
      const text = btn.dataset.copy || "";
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
        else {
          const ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
        }
        toast("已複製 " + text);
      } catch {
        toast("複製失敗，請長按手動複製");
      }
    };
  });
  const bindLine = document.getElementById("bind-line");
  if (bindLine) {
    bindLine.onclick = () => {
      const r = myRoom(); const t = me();
      const msg = (r ? r.no : "") + (t && t.name ? " " + t.name : "");
      window.open(lineOaMessageUrl(msg), "_blank", "noopener");
      toast("請傳送「房號 姓名」完成綁定");
    };
  }
  const nearbyBtn = document.getElementById("nearby-spots");
  if (nearbyBtn) nearbyBtn.onclick = () => { ui.nearbyOpen = true; render(); };
  const nearbyClose = document.getElementById("nearby-close");
  if (nearbyClose) nearbyClose.onclick = () => { ui.nearbyOpen = false; render(); };
  const nearbyMask = document.getElementById("nearby-mask");
  if (nearbyMask) nearbyMask.onclick = e => { if (e.target.id === "nearby-mask") { ui.nearbyOpen = false; render(); } };
  document.querySelectorAll("[data-poi]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const p = (ui.nearbyPois || [])[Number(btn.dataset.poi)];
      if (!p) return;
      window.open(poiNavUrl(p), "_blank", "noopener");
    };
  });
  const markPaid = document.getElementById("mark-paid");
  if (markPaid && !markPaid.disabled) {
    markPaid.onclick = () => {
      markTenantPaid("app");
      toast("已回報本月已繳費");
      ui.keepScroll = true;
      render();
    };
  }
  const linePaid = document.getElementById("line-paid");
  if (linePaid) {
    linePaid.onclick = async () => {
      const msg = linePayMessage();
      markTenantPaid("line");
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(msg);
      } catch {}
      const url = lineOaMessageUrl(msg);
      window.open(url, "_blank", "noopener");
      toast("已開啟官方 LINE，請直接傳送");
    };
  }
  document.querySelectorAll("[data-gcal]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      const kind = btn.dataset.gcalKind || "repair";
      const item = kind === "renew"
        ? (state.renewals || []).find(x => x.id === btn.dataset.gcal)
        : state.repairs.find(x => x.id === btn.dataset.gcal);
      if (!item) return;
      item.appointRead = true; save(); openGoogleCalendar(item, kind);
    };
  });
  document.querySelectorAll("[data-gcal-renew]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      const item = (state.renewals || []).find(x => x.id === btn.dataset.gcalRenew);
      if (!item) return;
      item.appointRead = true; save(); openGoogleCalendar(item, "renew");
    };
  });
  document.querySelectorAll("[data-read-announce]").forEach(el => {
    el.onclick = e => {
      e.preventDefault();
      const a = (state.announcements || []).find(x => x.id === el.dataset.readAnnounce);
      if (!a || !ui.tenantId) return;
      if (isDevPreview()) {
        if (!ui.devReadAnns) ui.devReadAnns = {};
        ui.devReadAnns[a.id] = true;
        const badge = el.querySelector(".badge.unpaid");
        if (badge) badge.remove();
        return;
      }
      if (!a.readBy) a.readBy = [];
      if (!a.readBy.includes(ui.tenantId)) {
        a.readBy.push(ui.tenantId);
        save();
        const badge = el.querySelector(".badge.unpaid");
        if (badge) badge.remove();
      }
    };
  });
  bindAnnounceReactions();
  document.querySelectorAll("[data-room]").forEach(el => {
    el.onclick = () => { ui.roomId = el.dataset.room; ui.page = "room-detail"; render(); };
  });
  document.querySelectorAll("[data-type]").forEach(el => {
    el.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.repairType = el.dataset.type;
      document.querySelectorAll("[data-type]").forEach(b => b.classList.toggle("selected", b.dataset.type === ui.repairType));
    };
  });
  const repairNote = document.getElementById("repair-note");
  if (repairNote) {
    repairNote.readOnly = false;
    repairNote.disabled = false;
    repairNote.tabIndex = 0;
    const keep = () => { ui.repairNote = repairNote.value; };
    repairNote.oninput = keep;
    repairNote.onchange = keep;
    repairNote.onblur = keep;
    const box = repairNote.closest(".repair-note-box");
    if (box) box.onpointerdown = e => { e.stopPropagation(); };
    repairNote.onpointerdown = e => { e.stopPropagation(); };
    repairNote.onmousedown = e => { e.stopPropagation(); };
    repairNote.onclick = e => { e.stopPropagation(); repairNote.focus(); };
  }
  bindMediaViewers();
  const contracts = (myRoom() && myRoom().contractImages) || [];
  document.querySelectorAll("[data-contract]").forEach(img => {
    img.onclick = () => openContractViewer(contracts, Number(img.dataset.contract));
  });
  const dlAll = document.getElementById("dl-all-contract");
  if (dlAll) {
    dlAll.onclick = e => {
      e.preventDefault();
      const room = myRoom();
      if (!room || !room.contractImages || !room.contractImages.length) { toast("尚無合約書圖檔可下載"); return; }
      downloadContractsPdf(room.contractImages, contractPdfName());
    };
  }
  const askRenew = document.getElementById("ask-renew");
  if (askRenew && !askRenew.disabled) {
    askRenew.onclick = () => {
      const t = me(); const r = myRoom();
      if (!t || !r) return;
      if (isDevPreview()) {
        if (!ui.devRenewals) ui.devRenewals = [];
        if (ui.devRenewals.some(x => x.tenantId === t.id && x.status !== "done")) { toast("已送出續約申請"); return; }
        ui.devRenewals.push({ id: "rn" + Date.now(), roomId: r.id, tenantId: t.id, status: "open", createdAt: nowStamp() });
        toast("預覽：已送出續約（不會寫入）");
        ui.keepScroll = true;
        render();
        return;
      }
      if ((state.renewals || []).some(x => x.tenantId === t.id && x.status !== "done")) {
        toast("已送出續約申請"); return;
      }
      if (!state.renewals) state.renewals = [];
      state.renewals.push({
        id: "rn" + Date.now(), roomId: r.id, tenantId: t.id, status: "open", createdAt: nowStamp()
      });
      save();
      pushPhoneNotify("續約申請", `${r.no} ${t.name || ""} 申請續約`, "admin");
      toast("已送出續約申請");
      ui.keepScroll = true;
      render();
    };
  }
  const mediaIn = document.getElementById("repair-media");
  const addRepairFiles = async (files) => {
    if (!ui.repairMedia) ui.repairMedia = [];
    for (const file of files) {
      const video = /^video\//.test(file.type) || /\.(mp4|mov|webm|m4v)$/i.test(file.name || "");
      if (video) {
        if (file.size > 8 * 1024 * 1024) { toast("影片請小於 8MB"); continue; }
        ui.repairMedia.push({ kind: "video", src: await readFileDataUrl(file), name: file.name });
      } else {
        try { ui.repairMedia.push({ kind: "image", src: await compressImage(file), name: file.name }); } catch {}
      }
    }
    const box = document.getElementById("media-preview");
    if (box) box.innerHTML = pendingPreviewHtml();
    bindPendingMedia();
  };
  if (mediaIn) mediaIn.onchange = () => { addRepairFiles(mediaIn.files); mediaIn.value = ""; };
  bindPendingMedia();
  const submit = document.getElementById("submit-repair");
  if (submit) {
    submit.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const note = ((document.getElementById("repair-note") || {}).value || ui.repairNote || "").trim();
      if (!note) { toast("請先描述問題，才能提交報修"); return; }
      const media = (ui.repairMedia || []).slice();
      const stamp = nowStamp();
      const room = myRoom();
      const rid = "r" + Date.now();
      const rec = {
        id: rid, roomId: room.id, tenantId: me().id, type: ui.repairType, note,
        photo: (media.find(m => m.kind === "image") || {}).src || null, media, status: "open", createdAt: stamp
      };
      if (isDevPreview()) {
        if (!ui.devRepairs) ui.devRepairs = [];
        ui.devRepairs.push(rec);
        ui.repairType = "冷氣"; ui.repairNote = ""; ui.repairMedia = []; ui.page = "repair-done";
        toast("預覽：已提交報修（不會寫入）");
        render();
        return;
      }
      state.repairs.push(rec);
      if (!state.notices) state.notices = [];
      state.notices.push({ id: "n" + Date.now(), type: "repair", repairId: rid, roomNo: room.no, text: `${room.no} ${ui.repairType}報修`, createdAt: stamp, read: false });
      syncRoomRepairStatus(room.id);
      try { save(); } catch {
        state.repairs.pop(); state.notices.pop(); toast("檔案太大，請改傳較小的照片或影片"); return;
      }
      pushPhoneNotify("新報修", `${room.no} ${me().name || ""}：${ui.repairType}　${note}`, "admin");
      ui.repairType = "冷氣"; ui.repairNote = ""; ui.repairMedia = []; ui.page = "repair-done";
      toast("已提交報修");
      render();
    };
  }
  const backRepair = document.getElementById("back-repair");
  if (backRepair) backRepair.onclick = () => { ui.page = "repair"; render(); };
  bindRepairDelete();
  bindSignPad();
  bindSignAgree();
}

function bindSignAgree() {
  const box = document.getElementById("sign-agree");
  const lab = document.querySelector("label.sign-agree");
  if (!box) return;
  box.checked = !!ui.signAgree;
  const sync = () => { ui.signAgree = !!box.checked; };
  box.onchange = sync;
  box.onclick = e => e.stopPropagation();
  if (lab) {
    lab.onclick = e => {
      if (e.target === box) return;
      e.preventDefault();
      e.stopPropagation();
      box.checked = !box.checked;
      sync();
    };
  }
}
function bindSignPad() {
  const c = document.getElementById("sign-pad");
  if (!c) return;
  const wrap = c.parentElement;
  const ctx = c.getContext("2d");
  if (!Array.isArray(ui.signStrokes)) ui.signStrokes = [];
  const style = () => {
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111111";
  };
  const redraw = () => {
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    style();
    (ui.signStrokes || []).forEach(line => {
      if (!line || line.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      for (let i = 1; i < line.length; i++) ctx.lineTo(line[i].x, line[i].y);
      ctx.stroke();
    });
    if (ui.signStrokes.length) c.dataset.ink = "1";
  };
  const fit = () => {
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.max(280, Math.round((wrap && wrap.clientWidth) || c.clientWidth || 320));
    const h = Math.max(160, Math.round((wrap && wrap.clientHeight) || 160));
    const bw = Math.round(w * ratio), bh = Math.round(h * ratio);
    if (c.width !== bw || c.height !== bh) {
      c.style.width = w + "px";
      c.style.height = h + "px";
      c.width = bw;
      c.height = bh;
    }
    redraw();
  };
  fit();
  if (c.dataset.bound === "1") return;
  c.dataset.bound = "1";
  c.setAttribute("draggable", "false");
  let drawing = false, last = null;
  const pt = e => {
    const r = c.getBoundingClientRect();
    const src = e.touches && e.touches[0] ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  };
  const start = e => {
    e.preventDefault();
    e.stopPropagation();
    ui.signing = true;
    drawing = true;
    last = pt(e);
    ui.signStrokes.push([last]);
  };
  const move = e => {
    if (!drawing) return;
    e.preventDefault();
    e.stopPropagation();
    const p = pt(e);
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
    const line = ui.signStrokes[ui.signStrokes.length - 1];
    if (line) line.push(p);
    c.dataset.ink = "1";
  };
  const end = e => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    drawing = false;
    ui.signing = false;
  };
  c.addEventListener("pointerdown", e => {
    try { c.setPointerCapture(e.pointerId); } catch {}
    start(e);
  });
  c.addEventListener("pointermove", move);
  c.addEventListener("pointerup", end);
  c.addEventListener("pointercancel", end);
  c.addEventListener("dragstart", e => e.preventDefault());
  c.addEventListener("selectstart", e => e.preventDefault());
  const clr = document.getElementById("sign-clear");
  if (clr) clr.onclick = () => {
    ui.signStrokes = [];
    c.dataset.ink = "";
    fit();
  };
  const ok = document.getElementById("sign-confirm");
  if (ok) ok.onclick = () => {
    const agree = document.getElementById("sign-agree");
    if (!agree || !agree.checked) { toast("請先勾選已閱讀並同意"); return; }
    if (c.dataset.ink !== "1" && !(ui.signStrokes && ui.signStrokes.length)) { toast("請先在白框內簽名"); return; }
    const t = me(); const r = myRoom();
    const rec = { status: "signed", at: nowStamp(), sig: c.toDataURL("image/png"), name: (t && t.name) || "" };
    ui.signStrokes = [];
    ui.signing = false;
    if (isDevPreview()) {
      ui.devESign = rec;
      ui.page = "lease";
      toast("預覽：已完成電子簽署（不會寫入）");
      ui.keepScroll = true;
      render();
      return;
    }
    if (t) t.eSign = rec;
    if (!state.notices) state.notices = [];
    state.notices.push({ id: "n" + Date.now(), type: "esign", roomNo: r && r.no, text: `${r ? r.no : ""} ${t && t.name ? t.name : ""} 已簽署電子合約`, createdAt: rec.at, read: false });
    save();
    pushPhoneNotify("電子合約已簽署", `${r ? r.no : ""} ${t && t.name ? t.name : ""} 已完成線上簽署`, "admin");
    ui.page = "lease";
    toast("已完成電子簽署");
    render();
  };
}
function bindAnnPending() {
  document.querySelectorAll("[data-del-ann-media]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      ui.announceMedia.splice(Number(btn.dataset.delAnnMedia), 1);
      const box = document.getElementById("ann-media-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.announceMedia, "data-del-ann-media");
      bindAnnPending();
    };
  });
}
function bindEditAnnPending() {
  document.querySelectorAll("[data-del-edit-ann-media]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      (ui.editAnnounceMedia || []).splice(Number(btn.dataset.delEditAnnMedia), 1);
      const box = document.getElementById("ann-edit-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.editAnnounceMedia || [], "data-del-edit-ann-media");
      bindEditAnnPending();
    };
  });
}

function bindAdminRoomItems() {
  document.querySelectorAll("[data-admin-room]").forEach(el => {
    el.onclick = e => {
      if (e.target.closest("select") || e.target.closest("button")) return;
      if (el.closest(".swipe-wrap") && el.closest(".swipe-wrap").dataset.swiping === "1") return;
      ui.roomId = el.dataset.adminRoom; ui.page = "room-edit"; render();
    };
  });
  document.querySelectorAll("[data-status]").forEach(sel => {
    sel.onclick = e => e.stopPropagation();
    sel.onchange = () => {
      const room = state.rooms.find(r => r.id === sel.dataset.status);
      room.status = sel.value; save(); toast(`${room.no} 已改為${statusLabel(room.status)}`);
    };
  });
}

function openLineChatFor(tenantId) {
  const t = state.tenants.find(x => x.id === tenantId);
  const r = t ? state.rooms.find(x => x.id === t.roomId) : null;
  const dock = document.getElementById("line-dock");
  const who = document.getElementById("line-dock-who");
  if (who) {
    const bound = r && lineBindForRoom(r.no);
    who.textContent = bound
      ? `${r.no} ${t ? t.name : ""} · 已綁定${lineBindName(r.no) ? " " + lineBindName(r.no) : ""}`
      : `${r ? r.no : ""} ${t ? t.name : ""} · 尚未綁定，請傳「房號 姓名」`;
  }
  const note = document.getElementById("line-dock-note");
  if (note && r) {
    note.textContent = lineBindForRoom(r.no)
      ? "此租客已綁定官方 LINE。聊天室後台可用房號或姓名搜尋。"
      : "此租客尚未綁定。請對方加入 @773zynao 並傳送「房號 姓名」。";
  }
  if (dock) {
    dock.style.transition = "transform .5s ease";
    dock.classList.add("open");
    dock.style.transform = "";
  }
  setTimeout(() => {
    try {
      if (ui.lineWin && !ui.lineWin.closed) ui.lineWin.focus();
      else ui.lineWin = window.open(LINE_CHAT_URL, "tongjie-line", "popup=yes,width=420,height=740,noopener");
    } catch {}
  }, 280);
}
function bindLineSwipe() {
  const close = document.getElementById("line-dock-close");
  if (close) close.onclick = () => {
    const dock = document.getElementById("line-dock");
    if (dock) {
      dock.classList.remove("open");
      dock.style.transform = "";
    }
    document.querySelectorAll(".swipe-front").forEach(el => { el.style.transform = ""; });
  };
  document.querySelectorAll("[data-swipe-tenant]").forEach(wrap => {
    const front = wrap.querySelector(".swipe-front");
    if (!front) return;
    let startX = 0, startY = 0, dx = 0, active = false, moved = false;
    const onDown = e => {
      if (e.target.closest("button") || e.target.closest("select") || e.target.closest("a")) return;
      const p = e.touches ? e.touches[0] : e;
      active = true; moved = false; wrap.dataset.swiping = "0";
      startX = p.clientX; startY = p.clientY; dx = 0;
      front.style.transition = "none";
      const dock = document.getElementById("line-dock");
      if (dock && !dock.classList.contains("open")) {
        dock.style.transition = "none";
        dock.style.transform = "translateX(calc(100% + 20px))";
      }
    };
    const onMove = e => {
      if (!active) return;
      const p = e.touches ? e.touches[0] : e;
      const mx = p.clientX - startX;
      const my = p.clientY - startY;
      if (!moved && Math.abs(mx) < 10 && Math.abs(my) < 10) return;
      if (!moved && Math.abs(my) > Math.abs(mx)) { active = false; return; }
      moved = true;
      wrap.dataset.swiping = "1";
      dx = Math.max(-48, Math.min(0, mx));
      front.style.transform = `translateX(${dx}px)`;
      if (e.cancelable) e.preventDefault();
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      front.style.transition = "transform .28s ease";
      const dock = document.getElementById("line-dock");
      if (dock) dock.style.transition = "transform .5s ease";
      if (-dx >= 36) {
        front.style.transform = "translateX(-48px)";
        openLineChatFor(wrap.dataset.swipeTenant);
      } else {
        front.style.transform = "";
        wrap.dataset.swiping = "0";
        if (dock && !dock.classList.contains("open")) dock.style.transform = "translateX(calc(100% + 20px))";
      }
      setTimeout(() => { if (-dx < 36) wrap.dataset.swiping = "0"; }, 280);
    };
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    wrap.addEventListener("touchstart", onDown, { passive: true });
    wrap.addEventListener("touchmove", onMove, { passive: false });
    wrap.addEventListener("touchend", onUp);
  });
}
function setFactoryPack(pack, close) {
  if (!pack) return;
  const inner = pack.querySelector(".factory-pack-inner") || pack;
  pack.style.overflow = "hidden";
  pack.style.transition = "height .45s cubic-bezier(.22,.82,.22,1)";
  const isClosed = pack.classList.contains("folded") || pack.style.height === "0px";
  if (close) {
    if (isClosed && pack.getBoundingClientRect().height < 2) return;
    pack.style.height = inner.scrollHeight + "px";
    pack.offsetHeight;
    pack.classList.add("folded");
    pack.style.height = "0px";
  } else {
    if (!isClosed && pack.style.height !== "0px") { pack.style.height = "auto"; return; }
    pack.classList.remove("folded");
    pack.style.height = "0px";
    pack.offsetHeight;
    pack.style.height = inner.scrollHeight + "px";
    const onEnd = e => {
      if (e.propertyName && e.propertyName !== "height") return;
      if (!pack.classList.contains("folded")) pack.style.height = "auto";
      pack.removeEventListener("transitionend", onEnd);
    };
    pack.addEventListener("transitionend", onEnd);
  }
}
function bindFactoryFold() {
  document.querySelectorAll("[data-factory-fold]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const g = btn.dataset.factoryFold;
      if (!ui.factoryFold) ui.factoryFold = {};
      ui.factoryFold[g] = !ui.factoryFold[g];
      const closed = !!ui.factoryFold[g];
      btn.classList.toggle("closed", closed);
      document.querySelectorAll("[data-factory-pack]").forEach(p => {
        if (p.dataset.factoryPack === g) setFactoryPack(p, closed);
      });
    };
  });
  const allBtn = document.getElementById("factory-all");
  if (allBtn) allBtn.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    const heads = [...document.querySelectorAll("[data-factory-fold]")];
    const close = heads.some(b => !b.classList.contains("closed"));
    if (!ui.factoryFold) ui.factoryFold = {};
    heads.forEach(b => {
      ui.factoryFold[b.dataset.factoryFold] = close;
      b.classList.toggle("closed", close);
    });
    document.querySelectorAll("[data-factory-pack]").forEach(p => setFactoryPack(p, close));
    allBtn.textContent = close ? "全部展開" : "全部收合";
  };
}
function bindStudioFold() {
  document.querySelectorAll("[data-studio-fold]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const g = btn.dataset.studioFold;
      if (!ui.studioFold) ui.studioFold = {};
      ui.studioFold[g] = !ui.studioFold[g];
      const closed = !!ui.studioFold[g];
      btn.classList.toggle("closed", closed);
      document.querySelectorAll("[data-studio-pack]").forEach(p => {
        if (p.dataset.studioPack === g) setFactoryPack(p, closed);
      });
    };
  });
  const allBtn = document.getElementById("studio-all");
  if (allBtn) allBtn.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    const heads = [...document.querySelectorAll("[data-studio-fold]")];
    const close = heads.some(b => !b.classList.contains("closed"));
    if (!ui.studioFold) ui.studioFold = {};
    heads.forEach(b => {
      ui.studioFold[b.dataset.studioFold] = close;
      b.classList.toggle("closed", close);
    });
    document.querySelectorAll("[data-studio-pack]").forEach(p => setFactoryPack(p, close));
    allBtn.textContent = close ? "全部展開" : "全部收合";
  };
}
function applyAnnouncementReaction(id) {
  if (!ui.tenantId) return;
  const a = (state.announcements || []).find(x => x.id === id);
  if (!a) return;
  if (isDevPreview()) {
    if (!ui.devReactions) ui.devReactions = {};
    ui.devReactions[id] = "heart";
    document.querySelectorAll(`[data-react-ann="${id}"]`).forEach(bar => { bar.outerHTML = reactBarHtml(a); });
    return;
  }
  if (!a.reactions) a.reactions = {};
  a.reactions[ui.tenantId] = "heart";
  save();
  document.querySelectorAll(`[data-react-ann="${id}"]`).forEach(bar => { bar.outerHTML = reactBarHtml(a); });
}
function popAnnounceCard(card) {
  if (!card) return;
  card.classList.remove("ann-pop");
  void card.offsetWidth;
  card.classList.add("ann-pop");
  const burst = document.createElement("div");
  burst.className = "ann-burst";
  burst.textContent = "❤️";
  card.appendChild(burst);
  setTimeout(() => burst.remove(), 650);
}
function bindAnnounceReactions() {
  document.querySelectorAll("[data-read-announce]").forEach(card => {
    if (ui.role !== "tenant" || !ui.tenantId) return;
    let lastTap = 0;
    card.addEventListener("pointerup", e => {
      if (e.target.closest("a,button,video,img")) return;
      const now = Date.now();
      if (now - lastTap < 340) {
        applyAnnouncementReaction(card.dataset.readAnnounce);
        popAnnounceCard(card);
        lastTap = 0;
      } else lastTap = now;
    });
  });
}
function bindAdmin() {
  const logout = document.getElementById("logout");
  if (logout) logout.onclick = () => { audit("登出", "登出"); clearSession(); render(); };
  const previewBtn = document.getElementById("preview-tenant");
  if (previewBtn) previewBtn.onclick = () => enterDevPreview();
  document.querySelectorAll("[data-log-filter]").forEach(btn => {
    btn.onclick = () => { ui.logFilter = btn.dataset.logFilter; ui.keepScroll = true; render(); };
  });
  document.querySelectorAll("[data-log-pick]").forEach(inp => {
    inp.onchange = () => {
      if (!ui.logPicked) ui.logPicked = {};
      if (inp.checked) ui.logPicked[inp.dataset.logPick] = true;
      else delete ui.logPicked[inp.dataset.logPick];
      ui.keepScroll = true;
      render();
    };
  });
  const logAll = document.getElementById("log-all");
  if (logAll) logAll.onclick = () => {
    const filter = ui.logFilter || "all";
    let list = (state.auditLogs || []).slice();
    if (filter === "tenant") list = list.filter(x => x.kind === "tenant");
    if (filter === "admin") list = list.filter(x => x.kind === "admin" || x.kind === "guest");
    const picked = ui.logPicked || {};
    const allOn = list.length && list.every(x => picked[x.id]);
    ui.logPicked = {};
    if (!allOn) list.forEach(x => { ui.logPicked[x.id] = true; });
    ui.keepScroll = true;
    render();
  };
  const logDelPicked = document.getElementById("log-del-picked");
  if (logDelPicked) logDelPicked.onclick = () => {
    const picked = ui.logPicked || {};
    const ids = Object.keys(picked);
    if (!ids.length) { toast("請先勾選要刪的紀錄"); return; }
    state.auditLogs = (state.auditLogs || []).filter(x => !picked[x.id]);
    ui.logPicked = {};
    save();
    ui.keepScroll = true;
    toast("日誌已移除");
  };
  const logDelAll = document.getElementById("log-del-all");
  if (logDelAll) logDelAll.onclick = () => {
    state.auditLogs = [];
    ui.logPicked = {};
    save();
    ui.keepScroll = true;
    toast("日誌已清空");
  };
  document.querySelectorAll("[data-del-log]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.delLog;
      state.auditLogs = (state.auditLogs || []).filter(x => x.id !== id);
      if (ui.logPicked) delete ui.logPicked[id];
      save();
      ui.keepScroll = true;
      toast("日誌已移除");
    };
  });
  bindMediaViewers();
  bindRepairDelete();
  bindAnnounceReactions();
  document.querySelectorAll("[data-firm-period]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      if (!ui.firmPeriod) ui.firmPeriod = {};
      ui.firmPeriod[btn.dataset.firmPeriod] = firmPeriod(btn.dataset.firmPeriod) === "year" ? "month" : "year";
      ui.keepScroll = true;
      render();
    };
  });
  document.querySelectorAll("[data-admin]").forEach(btn => {
    btn.onclick = e => {
      if (btn.classList.contains("tab") && btn.dataset.dragged === "1") {
        delete btn.dataset.dragged;
        e.preventDefault();
        return;
      }
      const id = btn.dataset.admin;
      const cur = ui.page === "home" || !ui.page ? "dash" : ui.page;
      if (btn.classList.contains("tab") && cur === id) return;
      const on = document.querySelector(".tabs .tab.on");
      if (on) ui.tabPill = { x: on.offsetLeft, y: on.offsetTop, w: on.offsetWidth, h: on.offsetHeight };
      ui.page = id;
      render();
    };
  });
  bindTabReorder();
  bindTabPill();
  bindAdminPageSwipe();
  bindSegPills();
  document.querySelectorAll("[data-asset-kind]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const kind = btn.dataset.assetKind;
      if (ui.assetKind === kind) return;
      ui.assetKind = kind;
      if (kind !== "studio") ui.studioBldg = null;
      const seg = btn.closest(".seg") || document.getElementById("asset-kind-seg");
      if (seg) {
        setSegSide(seg, kind === "factory", "is-studio", "is-factory");
        seg.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.assetKind === kind));
      }
      const box = document.getElementById("asset-list");
      if (box) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (ui.assetKind !== kind) return;
          box.innerHTML = adminRoomListHtml(kind);
          bindAdminRoomItems();
          bindStudioFold();
          bindFactoryFold();
        }));
      }
    };
  });
  bindSegSwipe(document.getElementById("asset-kind-seg"),
    () => { const b = document.querySelector("[data-asset-kind='studio']"); if (b) b.click(); },
    () => { const b = document.querySelector("[data-asset-kind='factory']"); if (b) b.click(); }
  );
  document.querySelectorAll("[data-tenant-kind]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const kind = btn.dataset.tenantKind === "factory" ? "factory" : "studio";
      if ((ui.tenantKind === "factory" ? "factory" : "studio") === kind) return;
      applyTenantKind(kind);
    };
  });
  bindSegSwipe(document.getElementById("tenant-kind-seg"),
    () => applyTenantKind("studio"),
    () => applyTenantKind("factory")
  );
  const onTab = document.querySelector(".tab.on");
  if (onTab && onTab.scrollIntoView) onTab.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  bindAdminRoomItems();
  bindStudioFold();
  bindFactoryFold();
  bindLineSwipe();
  bindTenantFold();
  bindTenantSearch();
  document.querySelectorAll("[data-invoice]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.invoiceRoomId = btn.dataset.invoice;
      ui.invoiceFrom = ui.page === "room-edit" ? "room-edit" : "tenants";
      ui.page = "invoice";
      render();
    };
  });
  const printInv = document.getElementById("print-invoice");
  if (printInv) printInv.onclick = () => {
    const track = document.getElementById("inv-track");
    const num = document.getElementById("inv-num");
    ui.invoiceTrack = track ? String(track.value || "").trim().toUpperCase() : "";
    ui.invoiceNum = num ? String(num.value || "").trim() : "";
    render();
    audit("操作", "列印發票 " + (ui.invoiceTrack || "") + (ui.invoiceNum || ""));
    setTimeout(() => window.print(), 50);
  };
  const invTrack = document.getElementById("inv-track");
  const invNum = document.getElementById("inv-num");
  if (invTrack) invTrack.onchange = () => { ui.invoiceTrack = String(invTrack.value || "").trim().toUpperCase(); };
  if (invNum) invNum.onchange = () => { ui.invoiceNum = String(invNum.value || "").trim(); };
  const exportBtn = document.getElementById("export-report");
  if (exportBtn) exportBtn.onclick = exportOverallReport;
  const printReport = document.getElementById("print-report");
  if (printReport) printReport.onclick = printOverallReport;
  bindReportBody();
  bindReportModeBtns();
  bindReportPeriodSeg();
  const acctBack = document.getElementById("acct-bal-back");
  if (acctBack) acctBack.onclick = () => { ui.editAcct = ""; ui.keepScroll = true; render(); };
  const acctForm = document.getElementById("acct-bal-form");
  if (acctForm) acctForm.onsubmit = e => {
    e.preventDefault();
    const name = ui.editAcct;
    if (!REPORT_ACCOUNTS.includes(name) && !isPersonalKey(name)) return;
    const b = reportBounds();
    const s = accountStats(name, b.start, b.end);
    const next = Number(String(acctForm.bal.value || "").replace(/[^\d.-]/g, ""));
    if (!state.accountOpenings) state.accountOpenings = {};
    if (name === "個人戶") {
      const peopleOpen = PERSONAL_PEOPLE.reduce((sum, p) => sum + (Number(state.accountOpenings[personalKey(p)]) || 0), 0);
      state.accountOpenings[name] = next - s.ledger - peopleOpen;
    } else {
      state.accountOpenings[name] = next - s.ledger;
    }
    ui.editAcct = "";
    save();
    ui.keepScroll = true;
    toast("已更新 " + accountLabel(name) + " 營收總額");
    render();
  };
  refreshLineBinds().then(() => {
    document.querySelectorAll("[data-line-status]").forEach(el => {
      const no = el.dataset.lineStatus;
      const bound = lineBindForRoom(no);
      el.innerHTML = `<span class="k">LINE</span>${bound ? `<span class="badge rented">已綁定${lineBindName(no) ? " · " + escapeHtml(lineBindName(no)) : ""}</span>` : `<span class="small">尚未綁定</span>`}`;
    });
  });
  const form = document.getElementById("room-edit-form");
  if (form) {
    form.onsubmit = e => { e.preventDefault(); e.stopPropagation(); saveRoomEdit(form); };
    form.querySelectorAll("input, select, textarea").forEach(el => {
      el.onpointerdown = e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); };
      el.onclick = e => { e.stopPropagation(); el.focus(); };
    });
  }
  const avAdmin = document.getElementById("tenant-avatar-admin");
  if (avAdmin) avAdmin.onchange = async () => {
    const f = avAdmin.files && avAdmin.files[0];
    avAdmin.value = "";
    if (!f) return;
    const r = state.rooms.find(x => x.id === ui.roomId);
    if (!r) return;
    let t = state.tenants.find(x => x.id === r.tenantId);
    if (!t) {
      t = { id: "t" + Date.now(), roomId: r.id, paid: true, leaseStart: "2026-03-01", leaseEnd: "2027-02-28", dueDay: 5, name: "" };
      state.tenants.push(t); r.tenantId = t.id;
    }
    try {
      t.avatar = await compressImage(f, 480);
      save();
      ui.keepScroll = true;
      toast("大頭貼已更新");
      render();
    } catch { toast("照片讀取失敗"); }
  };
  const roomPhotoUp = document.getElementById("room-photo-upload");
  if (roomPhotoUp) {
    roomPhotoUp.onchange = async () => {
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      ensurePhotos(room);
      const files = [...roomPhotoUp.files];
      for (const file of files) {
        if (room.photos.length >= 5) { toast("每個房間最多 5 張照片"); break; }
        try { room.photos.push(await compressImage(file)); } catch {}
      }
      save();
      render();
    };
  }
  document.querySelectorAll("[data-del-photo]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      room.photos.splice(Number(btn.dataset.delPhoto), 1);
      if (!room.photos.length) room.photos = photosFor(room.no, room.kind).slice();
      save();
      render();
    };
  });
  const up = document.getElementById("contract-upload");
  if (up) {
    up.onchange = async () => {
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      if (!room.contractImages) room.contractImages = [];
      for (const file of up.files) { try { room.contractImages.push(await compressImage(file)); } catch {} }
      save(); render();
    };
  }
  document.querySelectorAll("[data-del-contract]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      room.contractImages.splice(Number(btn.dataset.delContract), 1); save(); render();
    };
  });
  document.querySelectorAll("[data-toggle-pay]").forEach(btn => {
    btn.onclick = () => {
      const t = state.tenants.find(x => x.id === btn.dataset.togglePay);
      t.paid = !t.paid;
      if (t.paid) {
        if (!t.paidAt) t.paidAt = nowStamp();
        if (!t.paidVia) t.paidVia = "app";
      } else {
        t.paidVia = "";
        t.lineNotified = false;
        t.paidAt = "";
      }
      save(); render();
    };
  });
  document.querySelectorAll("[data-renew-done]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const item = (state.renewals || []).find(x => x.id === btn.dataset.renewDone);
      if (item) { item.status = "done"; save(); render(); }
    };
  });
  document.querySelectorAll("[data-renew-appoint]").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = () => {
      const item = (state.renewals || []).find(x => x.id === inp.dataset.renewAppoint);
      if (!item) return;
      item.appointAt = inp.value;
      item.appointRead = !inp.value;
      save();
      const shown = inp.closest(".appoint-box") && inp.closest(".appoint-box").querySelector(".small");
      if (shown) shown.textContent = inp.value ? "已預約 " + formatDateTime12(String(inp.value).replace("T", " ")) : "選擇簽約時間";
      if (inp.value) {
        const room = state.rooms.find(x => x.id === item.roomId);
        pushPhoneNotify("續約簽約時間", `${room ? room.no : ""} ${formatDateTime12(String(inp.value).replace("T", " "))}`, room ? room.no : "tenants");
      }
    };
  });
  document.querySelectorAll("[data-rep-status]").forEach(btn => {
    btn.onclick = () => {
      const [id, status] = btn.dataset.repStatus.split("|");
      const rep = state.repairs.find(x => x.id === id);
      if (!rep) return;
      rep.status = status; syncRoomRepairStatus(rep.roomId); save();
      const room = state.rooms.find(x => x.id === rep.roomId);
      pushPhoneNotify("報修進度", `${room ? room.no : ""} ${rep.type}已改為${status === "done" ? "已完成" : "處理中"}`, room ? room.no : "tenants");
      const card = btn.closest(".card"); const seg = btn.closest(".seg");
      if (seg) {
        setSegSide(seg, status === "done", "is-doing", "is-done");
        seg.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === btn));
      }
      const badge = card && card.querySelector(".badge");
      if (badge) { badge.className = "badge " + status; badge.textContent = status === "done" ? "已完成" : "處理中"; }
      updateTabBadges();
    };
  });
  document.querySelectorAll("[data-appoint]").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = () => {
      const rep = state.repairs.find(x => x.id === inp.dataset.appoint);
      if (!rep) return;
      rep.appointAt = inp.value; rep.appointRead = !inp.value; save();
      const shown = inp.closest(".card") && inp.closest(".card").querySelector(".appoint-shown");
      if (shown) shown.textContent = inp.value ? "已預約 " + formatDateTime12(String(inp.value).replace("T", " ")) : "選擇完成維修的時間";
      if (inp.value) {
        const room = state.rooms.find(x => x.id === rep.roomId);
        pushPhoneNotify("報修預約已安排", `${room ? room.no : ""} ${formatDateTime12(String(inp.value).replace("T", " "))}`, room ? room.no : "tenants");
      }
    };
  });
  const rulesForm = document.getElementById("rules-form");
  if (rulesForm) {
    rulesForm.onsubmit = e => {
      e.preventDefault();
      const text = formVal(rulesForm, "rules").trim();
      if (!text) { toast("請填寫使用規範"); return; }
      state.houseRules = text;
      save();
      toast("使用規範已更新，租客租約會同步");
    };
    document.querySelectorAll("#rules-form textarea").forEach(el => {
      el.addEventListener("pointerdown", e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); });
      el.addEventListener("click", e => { e.stopPropagation(); el.focus(); });
    });
  }
  const af = document.getElementById("announce-form");
  if (af) {
    const fold = document.getElementById("announce-fold");
    if (fold) fold.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.announceOpen = !af.classList.contains("open");
      af.classList.toggle("open", ui.announceOpen);
      const body = af.querySelector(".tenant-slim-body");
      if (body) {
        if (ui.announceOpen) body.removeAttribute("inert");
        else body.setAttribute("inert", "");
      }
      const hint = fold.querySelector(".small");
      if (hint) hint.textContent = ui.announceOpen ? "點擊收起" : "點擊展開";
    };
    const addAnnFiles = async (files) => {
      if (!ui.announceMedia) ui.announceMedia = [];
      for (const file of files) {
        const video = /^video\//.test(file.type) || /\.(mp4|mov|webm|m4v)$/i.test(file.name || "");
        if (video) {
          if (file.size > 8 * 1024 * 1024) { toast("影片請小於 8MB"); continue; }
          ui.announceMedia.push({ kind: "video", src: await readFileDataUrl(file), name: file.name });
        } else {
          try { ui.announceMedia.push({ kind: "image", src: await compressImage(file), name: file.name }); } catch {}
        }
      }
      const box = document.getElementById("ann-media-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.announceMedia, "data-del-ann-media");
      bindAnnPending();
    };
    const media = document.getElementById("ann-media");
    if (media) media.onchange = () => { addAnnFiles(media.files); media.value = ""; };
    bindAnnPending();
    document.querySelectorAll("#announce-form input, #announce-form textarea").forEach(el => {
      el.addEventListener("pointerdown", e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); });
      el.addEventListener("click", e => { e.stopPropagation(); el.focus(); });
    });
    af.onsubmit = e => {
      e.preventDefault();
      const title = formVal(af, "title").trim();
      const body = formVal(af, "body").trim();
      if (!title || !body) { toast("請填寫標題與內容"); return; }
      if (!state.announcements) state.announcements = [];
      const media = (ui.announceMedia || []).slice();
      state.announcements.push({ id: "a" + Date.now(), title, body, media, createdAt: nowStamp(), readBy: [], reactions: {}, postedBy: ui.adminCode || "" });
      ui.announceMedia = [];
      ui.announceOpen = false;
      save();
      pushPhoneNotify("管理員公告", title + "\n" + body, "tenants");
      toast("已發布公告");
      render();
    };
  }
  const editForm = document.getElementById("ann-edit-form");
  if (editForm) {
    const addEditFiles = async (files) => {
      if (!ui.editAnnounceMedia) ui.editAnnounceMedia = [];
      for (const file of files) {
        const video = /^video\//.test(file.type) || /\.(mp4|mov|webm|m4v)$/i.test(file.name || "");
        if (video) {
          if (file.size > 8 * 1024 * 1024) { toast("影片請小於 8MB"); continue; }
          ui.editAnnounceMedia.push({ kind: "video", src: await readFileDataUrl(file), name: file.name });
        } else {
          try { ui.editAnnounceMedia.push({ kind: "image", src: await compressImage(file), name: file.name }); } catch {}
        }
      }
      const box = document.getElementById("ann-edit-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.editAnnounceMedia, "data-del-edit-ann-media");
      bindEditAnnPending();
    };
    const em = document.getElementById("ann-edit-media");
    if (em) em.onchange = () => { addEditFiles(em.files); em.value = ""; };
    bindEditAnnPending();
    document.querySelectorAll("#ann-edit-form input, #ann-edit-form textarea").forEach(el => {
      el.addEventListener("pointerdown", e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); });
      el.addEventListener("click", e => { e.stopPropagation(); el.focus(); });
    });
    editForm.onsubmit = e => { e.preventDefault(); saveAnnounceEdit(); };
    const saveBtn = document.getElementById("ann-edit-save");
    if (saveBtn) saveBtn.onclick = e => { e.preventDefault(); e.stopPropagation(); saveAnnounceEdit(); };
  }
  document.querySelectorAll("[data-edit-announce]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      startAnnounceEdit(btn.dataset.editAnnounce);
    };
  });
  document.querySelectorAll("[data-del-announce]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      deleteAnnounce(btn.dataset.delAnnounce);
    };
  });
  bindAdminAi();
  bindCashCal();
}

function bindAiBlockReorder() {
  const box = document.getElementById("ai-blocks");
  if (!box) return;
  let dragEl = null, startY = 0, holdX = 0, originY = 0, armed = false, moved = false;
  const items = () => [...box.querySelectorAll(":scope > .ai-block")];
  const pt = e => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };
  const follow = y => {
    if (!dragEl) return;
    dragEl.style.transform = "translate3d(0," + (y - startY) + "px,0)";
  };
  const onMove = e => {
    if (!dragEl) return;
    const p = pt(e);
    if (!armed) {
      const dy = p.y - originY, dx = p.x - holdX;
      if (Math.abs(dx) > 16 && Math.abs(dx) > Math.abs(dy)) { dragEl = null; return; }
      if (Math.abs(dy) < 10) return;
      armed = true;
      moved = true;
      box.classList.add("sorting");
      dragEl.classList.add("dragging");
      try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
    }
    if (e.cancelable) e.preventDefault();
    moved = true;
    follow(p.y);
    const midY = dragEl.getBoundingClientRect().top + dragEl.offsetHeight / 2;
    for (const t of items()) {
      if (t === dragEl) continue;
      const mid = t.getBoundingClientRect().top + t.offsetHeight / 2;
      const from = items().indexOf(dragEl);
      const to = items().indexOf(t);
      if (from < to && midY > mid) {
        const top = dragEl.getBoundingClientRect().top;
        box.insertBefore(dragEl, t.nextSibling);
        startY += dragEl.getBoundingClientRect().top - top;
        follow(p.y);
        break;
      }
      if (from > to && midY < mid) {
        const top = dragEl.getBoundingClientRect().top;
        box.insertBefore(dragEl, t);
        startY += dragEl.getBoundingClientRect().top - top;
        follow(p.y);
        break;
      }
    }
  };
  const onEnd = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("pointerup", onEnd);
    window.removeEventListener("touchend", onEnd);
    window.removeEventListener("pointercancel", onEnd);
    if (dragEl) {
      dragEl.style.transform = "";
      dragEl.classList.remove("dragging");
      if (moved) {
        dragEl.dataset.dragged = "1";
        saveAiBlockOrder(items().map(n => n.dataset.aiBlock));
      }
    }
    box.classList.remove("sorting");
    dragEl = null;
    armed = false;
    moved = false;
  };
  box.addEventListener("pointerdown", e => {
    const handle = e.target.closest(".ai-drag");
    if (!handle) return;
    e.preventDefault();
    e.stopPropagation();
    const block = handle.closest(".ai-block");
    if (!block) return;
    const p = pt(e);
    dragEl = block;
    startY = p.y;
    originY = p.y;
    holdX = p.x;
    armed = true;
    moved = false;
    box.classList.add("sorting");
    dragEl.classList.add("dragging");
    try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("touchend", onEnd);
    window.addEventListener("pointercancel", onEnd);
  }, true);
  box.addEventListener("click", e => {
    if (e.target.closest(".ai-drag")) { e.preventDefault(); e.stopPropagation(); }
  }, true);
}
function bindAdminAi() {
  bindErrandGuessPicks();
  const ask = q => {
    const text = String(q || "").trim();
    if (!text) return;
    if (!state.aiLogs) state.aiLogs = [];
    state.aiLogs.push({ role: "admin", text, at: nowStamp() });
    state.aiLogs.push({ role: "ai", text: aiAnswer(text), at: nowStamp() });
    if (state.aiLogs.length > 40) state.aiLogs = state.aiLogs.slice(-40);
    ui.aiOpen = true;
    save(); render();
  };
  const aiCard = document.getElementById("ai-card");
  const aiFold = document.getElementById("ai-fold");
  if (aiFold && aiCard) aiFold.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    const block = aiFold.closest(".ai-block");
    if (block && block.dataset.dragged === "1") { delete block.dataset.dragged; return; }
    ui.aiOpen = !aiCard.classList.contains("open");
    aiCard.classList.toggle("open", ui.aiOpen);
    const hint = aiFold.querySelector(".small");
    if (hint) hint.textContent = ui.aiOpen ? "點擊收起" : "點擊展開";
  };
  document.querySelectorAll("[data-ai-q]").forEach(btn => {
    btn.onclick = () => ask(btn.dataset.aiQ);
  });
  const form = document.getElementById("ai-form");
  if (form) form.onsubmit = e => {
    e.preventDefault();
    const box = document.getElementById("ai-q");
    ask(box && box.value);
  };
  const errand = document.getElementById("errand-form");
  if (errand) {
    const fold = document.getElementById("errand-fold");
    if (fold) fold.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const block = fold.closest(".ai-block");
      if (block && block.dataset.dragged === "1") { delete block.dataset.dragged; return; }
      ui.errandOpen = !errand.classList.contains("open");
      ui.bankOpen = ui.errandOpen;
      errand.classList.toggle("open", ui.errandOpen);
      const hint = fold.querySelector(".small");
      if (hint) hint.textContent = ui.errandOpen ? "點擊收起" : "點擊展開";
    };
    errand.onsubmit = e => {
    e.preventDefault();
    const g = ui.errandGuess;
    if (!g && !ui.errandAbsorb) { toast("請先上傳照片或檔案"); return; }
    const date = ymdOf((g && g.date) || nowStamp());
    const amount = Number(g && g.amount) || 0;
    const title = (g && g.title) || (amount ? "入帳" : "現場紀錄");
    const place = (g && g.place) || "";
    const note = (g && g.note) || ui.errandAbsorb || "";
    const company = normalizeBookCompany((g && g.company) || "統潔");
    const id = "er" + Date.now();
    if (!state.errands) state.errands = [];
    if (!state.books) state.books = [];
    const pendingBank = !!(g && g.pendingBank);
    const cashType = (g && g.cashType) === "out" ? "out" : "in";
    const bankLike = cashType !== "out" && (/跑銀行|入帳|對帳|存摺|簿子/.test(title) || /聯邦|兆豐|農會/.test(place));
    const cash = bankLike && amount ? findPendingCashBook(amount, date) : null;
    if (amount && cash) {
      cash.linkedId = id;
      cash.pendingBank = false;
      state.books.push({
        id: "bk" + Date.now(), type: "out", date, amount, company: "現金(保險箱)",
        bank: "", note: "轉存銀行（對應 " + (cash.note || "現金收租") + "）", linkedId: cash.id
      });
      state.books.push({
        id: "bk" + (Date.now() + 1), type: "in", date, amount, company: company === "現金(保險箱)" ? "統潔" : company,
        bank: place, note: "銀行入帳（對應先前現金）", linkedId: cash.id
      });
    } else if (amount) {
      state.books.push({
        id: "bk" + Date.now(), type: cashType,
        date, amount, company, bank: place, note: note || title,
        pendingBank: cashType === "in" && (pendingBank || company === "現金(保險箱)")
      });
    }
    state.errands.push({
      id, kind: "bank", date, title, place, amount, note, company,
      pendingBank: pendingBank && !cash, linkedId: cash ? cash.id : "",
      skipLedger: true, summary: ui.errandAbsorb || "", createdAt: nowStamp()
    });
    const p = date.split("-");
    if (p.length === 3) {
      ui.calYear = Number(p[0]);
      ui.calMonth = Number(p[1]);
      ui.calDay = Number(p[2]);
    }
    ui.errandMedia = [];
    ui.errandAbsorb = "";
    ui.errandGuess = null;
    ui.errandOpen = true;
    if (amount) {
      if (!state.aiLogs) state.aiLogs = [];
      const msg = cash
        ? "已對帳：先前現金 " + money(amount) + " 轉入 " + company + "，金流不重複計算。"
        : pendingBank
          ? "已記收現行為 " + money(amount) + " 入現金，待之後存摺入帳再對帳。"
          : cashType === "out"
            ? "已記繳費支出 " + money(amount) + "（" + company + "）。"
            : "已查看「" + title + "」" + money(amount) + "（" + company + "）。";
      state.aiLogs.push({ role: "ai", text: msg });
    }
    save();
    toast(cash ? "已對帳，同一筆錢不重複算" : (pendingBank ? "已記收現，待入銀行" : "登錄成功"));
    ui.keepScroll = true;
    render();
    };
    document.querySelectorAll("#errand-form input, #errand-form select, #errand-form textarea, #errand-form .bank-pick").forEach(el => {
      el.addEventListener("pointerdown", e => { e.stopPropagation(); setTimeout(() => { if (el.focus) el.focus(); }, 0); });
      el.addEventListener("click", e => e.stopPropagation());
    });
  }
  document.querySelectorAll("[data-del-errand-media]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      (ui.errandMedia || []).splice(Number(btn.dataset.delErrandMedia), 1);
      const box = document.getElementById("errand-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.errandMedia, "data-del-errand-media");
      bindAdminAi();
    };
  });
  const errandPhoto = document.getElementById("errand-photo");
  if (errandPhoto) errandPhoto.onchange = async () => {
    const files = errandPhoto.files;
    ui.errandGuess = inferFromUpload(files);
    const got = await absorbUploadFiles(files, "errand");
    errandPhoto.value = "";
    const box = document.getElementById("errand-absorb");
    if (box) box.textContent = got.line || "";
    refreshErrandGuessBox();
    toast(ui.errandGuess && ui.errandGuess.title ? ("預判：" + ui.errandGuess.title) : (got.line || "已吸收檔案"));
  };
  document.querySelectorAll("[data-del-errand]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.delErrand;
      state.errands = (state.errands || []).filter(x => x.id !== id);
      state.books = (state.books || []).filter(x => x.id !== id);
      save(); toast("已刪除");
    };
  });
  document.querySelectorAll("[data-del-bank-media]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      (ui.bankMedia || []).splice(Number(btn.dataset.delBankMedia), 1);
      const box = document.getElementById("bank-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.bankMedia, "data-del-bank-media");
      bindAdminAi();
    };
  });
  const file = document.getElementById("bank-file");
  if (file) file.onchange = async () => {
    const got = await absorbUploadFiles(file.files, "bank");
    file.value = "";
    const dateEl = document.getElementById("bank-date");
    const amtEl = document.getElementById("bank-amount");
    const noteEl = document.getElementById("bank-note");
    const coEl = document.getElementById("bank-company");
    const meta = (got.meta || [])[0] || {};
    if (dateEl && !dateEl.value && meta.date) dateEl.value = meta.date;
    if (amtEl && !amtEl.value && meta.amount) amtEl.value = String(meta.amount);
    if (noteEl && got.names.length) noteEl.value = [noteEl.value, got.names.join("、")].filter(Boolean).join(" · ");
    if (coEl && meta.company) coEl.value = meta.company;
    const box = document.getElementById("bank-absorb");
    if (box) box.textContent = got.line || "";
    toast(got.line || "已吸收檔案");
  };
  const bank = document.getElementById("bank-form");
  if (bank) {
    const fold = document.getElementById("bank-fold");
    if (fold) fold.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      const block = fold.closest(".ai-block");
      if (block && block.dataset.dragged === "1") { delete block.dataset.dragged; return; }
      ui.bankOpen = !bank.classList.contains("open");
      bank.classList.toggle("open", ui.bankOpen);
      const hint = fold.querySelector(".small");
      if (hint) hint.textContent = ui.bankOpen ? "點擊收起" : "點擊展開";
    };
    bank.onsubmit = e => {
      e.preventDefault();
      const date = formVal(bank, "date").trim();
      const amount = Number(String(formVal(bank, "amount")).replace(/[^\d.]/g, "")) || 0;
      const note = formVal(bank, "note").trim();
      const company = normalizeBookCompany(formVal(bank, "company") || cellAccount(note) || "統潔");
      if (!date) { toast("請填入帳日期"); return; }
      if (!state.bankSlips) state.bankSlips = [];
      state.bankSlips.push({
        id: "slip" + Date.now(),
        date, amount, roomNo: "", note, company,
        summary: ui.bankAbsorb || "",
        createdAt: nowStamp()
      });
      ui.bankMedia = [];
      ui.bankAbsorb = "";
      ui.bankOpen = false;
      if (amount) {
        if (!state.aiLogs) state.aiLogs = [];
        state.aiLogs.push({ role: "ai", text: "已查看銀行入帳 " + money(amount) + "（" + company + "）。同一天、同金額、同帳戶的重複資料，進出帳與整體報表只會算一筆。" });
        const p = String(date || "").split("-");
        if (p.length === 3) { ui.calYear = Number(p[0]); ui.calMonth = Number(p[1]); ui.calDay = Number(p[2]); }
      }
      save();
      toast(amount ? "已納入進出帳與整體報表" : "已儲存入帳資料（未填金額，未記入進出帳）");
    };
    document.querySelectorAll("#bank-form input, #bank-form select, #bank-form textarea").forEach(el => {
      el.addEventListener("pointerdown", e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); });
      el.addEventListener("click", e => { e.stopPropagation(); el.focus(); });
    });
  }
  document.querySelectorAll("[data-del-slip]").forEach(btn => {
    btn.onclick = () => {
      state.bankSlips = (state.bankSlips || []).filter(x => x.id !== btn.dataset.delSlip);
      save(); render();
    };
  });
  bindAiBlockReorder();
}
function bindCashCal() {
  ensureCalMonth();
  const stay = () => { ui.keepScroll = true; render(); };
  const exportCal = document.getElementById("export-cal");
  if (exportCal) exportCal.onclick = e => { e.preventDefault(); e.stopPropagation(); exportMonthCash(); };
  const printCal = document.getElementById("print-cal");
  if (printCal) printCal.onclick = e => { e.preventDefault(); e.stopPropagation(); printMonthCash(); };
  const clearFilter = document.getElementById("cal-filter-clear");
  if (clearFilter) clearFilter.onclick = e => {
    e.preventDefault();
    ui.calFilter = "";
    ui.calBank = "";
    stay();
  };
  const allMonth = document.getElementById("cal-month-all");
  if (allMonth) allMonth.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    ensureCalMonth();
    ui.calDay = 1;
    ui.calDayEnd = new Date(ui.calYear, ui.calMonth, 0).getDate();
    stay();
  };
  const search = document.getElementById("cal-search");
  if (search) {
    search.onpointerdown = e => { e.stopPropagation(); setTimeout(() => search.focus(), 0); };
    search.onclick = e => { e.stopPropagation(); search.focus(); };
    search.onkeydown = e => e.stopPropagation();
    search.onkeyup = e => e.stopPropagation();
    search.oninput = () => {
      ui.calQ = String(search.value || "");
      refreshCalSearchLive();
    };
  }
  document.querySelectorAll("[data-cal-nav]").forEach(btn => {
    btn.onclick = () => {
      let y = ui.calYear, m = ui.calMonth + Number(btn.dataset.calNav);
      if (m < 1) { m = 12; y -= 1; }
      if (m > 12) { m = 1; y += 1; }
      ui.calYear = y; ui.calMonth = m; ui.calDay = 1; ui.calDayEnd = 0;
      stay();
    };
  });
  const grid = document.querySelector(".cal-grid");
  if (grid) {
    let a = 0, dragging = false;
    const paint = (from, to) => {
      const s = Math.min(from, to), e = Math.max(from, to);
      grid.querySelectorAll("[data-cal-day]").forEach(btn => {
        const d = Number(btn.dataset.calDay);
        btn.classList.toggle("on", d >= s && d <= e);
      });
    };
    grid.onpointerdown = e => {
      const cell = e.target.closest("[data-cal-day]");
      if (!cell) return;
      a = Number(cell.dataset.calDay);
      dragging = true;
      try { grid.setPointerCapture(e.pointerId); } catch {}
      paint(a, a);
    };
    grid.onpointermove = e => {
      if (!dragging) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cell = el && el.closest && el.closest("[data-cal-day]");
      if (cell) paint(a, Number(cell.dataset.calDay));
    };
    const endDrag = e => {
      if (!dragging) return;
      dragging = false;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cell = el && el.closest && el.closest("[data-cal-day]");
      const b = cell ? Number(cell.dataset.calDay) : a;
      ui.calDay = Math.min(a, b);
      ui.calDayEnd = Math.max(a, b);
      if (ui.calDayEnd === ui.calDay) ui.calDayEnd = 0;
      stay();
    };
    grid.onpointerup = endDrag;
    grid.onpointercancel = endDrag;
  }
  bindCalLedgerRows();
  const cancelEdit = document.getElementById("cancel-book-edit");
  if (cancelEdit) cancelEdit.onclick = () => { ui.editBookId = null; ui.editSlipId = null; stay(); };
  const form = document.getElementById("book-form");
  if (form) {
    form.querySelectorAll("input, select").forEach(el => {
      el.onpointerdown = e => { e.stopPropagation(); setTimeout(() => el.focus(), 0); };
      el.onclick = e => { e.stopPropagation(); el.focus(); };
    });
    if (form.type) form.type.onchange = () => {
      form.type.classList.remove("in", "out");
      form.type.classList.add(form.type.value === "out" ? "out" : "in");
    };
    if (form.company) form.company.onchange = () => {
      const acct = normalizeBookCompany(form.company.value);
      const row = document.getElementById("book-bank-row");
      if (!row) return;
      const banks = banksOf(acct);
      if (!banks.length) { row.style.display = "none"; return; }
      row.style.display = "";
      const cur = form.bank && form.bank.value;
      const sel = row.querySelector("select");
      if (sel) sel.outerHTML = bankSelectHtml(acct, cur);
    };
    const saveBook = () => {
      const amount = Number(String(form.amount.value || "").replace(/[^\d.]/g, "")) || 0;
      const date = form.date.value;
      if (!amount || !date) { toast("請填日期與金額"); return; }
      const payload = {
        type: form.type.value === "out" ? "out" : "in",
        date, amount,
        company: normalizeBookCompany(form.company && form.company.value),
        bank: (form.bank && form.bank.value) || "",
        note: (form.note.value || "").trim()
      };
      if (ui.editBookId) {
        const b = (state.books || []).find(x => x.id === ui.editBookId);
        if (b) Object.assign(b, payload);
        ui.editBookId = null;
        ui.calDay = Number(date.slice(8, 10));
        save();
        toast("已儲存變更");
        stay();
        return;
      }
      if (ui.editSlipId) {
        const s = (state.bankSlips || []).find(x => x.id === ui.editSlipId);
        if (s) { s.date = date; s.amount = amount; s.note = payload.note; s.company = payload.company; s.bank = payload.bank; }
        ui.editSlipId = null;
        ui.calDay = Number(date.slice(8, 10));
        save();
        toast("已儲存變更");
        stay();
        return;
      }
      if (!state.books) state.books = [];
      state.books.push(Object.assign({ id: "bk" + Date.now(), roomNo: "", createdAt: nowStamp() }, payload));
      ui.calDay = Number(date.slice(8, 10));
      save();
      toast("已記入日曆");
      stay();
    };
    form.onsubmit = e => { e.preventDefault(); e.stopPropagation(); saveBook(); };
    const saveBtn = document.getElementById("book-save");
    if (saveBtn) saveBtn.onclick = e => { e.preventDefault(); e.stopPropagation(); saveBook(); };
  }
  const xls = document.getElementById("book-xls");
  if (xls) xls.onchange = () => {
    const file = xls.files && xls.files[0];
    xls.value = "";
    if (!file) return;
    importExcelBooks(file, stay);
  };
}

window.addEventListener("appinstalled", () => {
  deferredInstall = null;
  ui.installSheet = "";
  try { localStorage.setItem("tongjie_installed", "1"); } catch {}
  try { sessionStorage.removeItem("tj-notify-snooze"); } catch {}
  ui.notifyGuide = true;
  enablePush().then(ok => {
    if (ok) ui.notifyGuide = false;
    render();
  });
});
function isInstalledApp() {
  if (isStandalone()) return true;
  if (isIOS()) return false;
  try { if (localStorage.getItem("tongjie_installed") === "1") return true; } catch {}
  return false;
}
async function installApp(kind, fromSheet) {
  const wantMobile = kind === "mobile";
  if (deferredInstall && !isIOS()) {
    try {
      const ev = deferredInstall;
      ev.prompt();
      const choice = await ev.userChoice.catch(() => null);
      deferredInstall = null;
      if (choice && choice.outcome === "accepted") {
        try { localStorage.setItem("tongjie_installed", "1"); } catch {}
        ui.installSheet = "";
        try { sessionStorage.removeItem("tj-notify-snooze"); } catch {}
        ui.notifyGuide = true;
        const ok = await enablePush();
        if (ok) ui.notifyGuide = false;
        render();
        return;
      }
    } catch {}
  }
  if (fromSheet) {
    toast(wantMobile ? "請依畫面上的步驟安裝到手機" : "請依畫面上的步驟安裝到電腦");
    return;
  }
  ui.installSheet = wantMobile ? "mobile" : "desktop";
  render();
}
document.addEventListener("click", e => {
  const app = document.getElementById("app");
  if (!app || !app.contains(e.target)) return;
  const goBtn = e.target.closest("[data-go]");
  if (goBtn && !ui.role) { ui.page = goBtn.dataset.go; ui.loginError = ""; render(); return; }
  const edit = e.target.closest("[data-edit-announce]");
  if (edit) {
    e.preventDefault();
    e.stopPropagation();
    startAnnounceEdit(edit.dataset.editAnnounce);
    return;
  }
  const del = e.target.closest("[data-del-announce]");
  if (del) {
    e.preventDefault();
    e.stopPropagation();
    deleteAnnounce(del.dataset.delAnnounce);
    return;
  }
  const cancel = e.target.closest("[data-cancel-announce]");
  if (cancel) {
    e.preventDefault();
    e.stopPropagation();
    cancelAnnounceEdit();
    return;
  }
  const saveAnn = e.target.closest("[data-save-announce]");
  if (saveAnn) {
    e.preventDefault();
    e.stopPropagation();
    saveAnnounceEdit();
  }
}, true);
function bindPullRefresh() {
  const sc = document.querySelector(".tenant-scroll") || document.querySelector(".admin-scroll");
  if (!sc) return;
  let ptr = sc.querySelector(":scope > .ptr");
  if (!ptr) {
    ptr = document.createElement("div");
    ptr.className = "ptr";
    ptr.innerHTML = "<em></em><span>下拉重新整理</span>";
    sc.insertBefore(ptr, sc.firstChild);
  }
  if (sc.dataset.ptrBound === "1") return;
  sc.dataset.ptrBound = "1";
  let y0 = 0, pulling = false, dy = 0, busy = false;
  const max = 92, need = 62;
  const live = () => sc.querySelector(":scope > .ptr");
  const setH = (h, text) => {
    const box = live();
    if (!box) return;
    box.style.height = Math.max(0, h) + "px";
    box.classList.toggle("on", h >= need);
    const label = box.querySelector("span");
    if (label) label.textContent = text || (h >= need ? "放開後重新整理" : "下拉重新整理");
  };
  sc.addEventListener("touchstart", e => {
    if (busy || sc.scrollTop > 2) { pulling = false; return; }
    if (e.target.closest("form, input, textarea, select, canvas, .swipe-wrap, .seg, .tabs, button, label")) return;
    y0 = e.touches[0].clientY;
    pulling = true;
    dy = 0;
    const box = live();
    if (box) box.style.transition = "none";
  }, { passive: true });
  sc.addEventListener("touchmove", e => {
    if (!pulling || busy) return;
    if (sc.scrollTop > 2) { pulling = false; setH(0); return; }
    dy = Math.max(0, (e.touches[0].clientY - y0) * 0.45);
    if (dy > 10) {
      if (e.cancelable) e.preventDefault();
      setH(Math.min(max, dy));
    }
  }, { passive: false });
  sc.addEventListener("touchend", async () => {
    if (!pulling || busy) return;
    pulling = false;
    const box = live();
    if (box) box.style.transition = "height .25s ease";
    if (dy >= need) {
      busy = true;
      if (box) box.classList.add("busy");
      setH(56, "重新整理中…");
      try {
        await pullCloud();
        if (window.__swReg) window.__swReg.update().catch(() => {});
      } catch {}
      lastRenderPage = ui.page;
      lastRenderRole = ui.role;
      ui.keepScroll = false;
      render();
      toast("已重新整理");
      return;
    }
    setH(0);
    dy = 0;
  });
}
function hideSplash() {
  const el = document.getElementById("splash");
  if (!el || el.dataset.done === "1") return;
  el.dataset.done = "1";
  el.classList.add("out");
  el.style.display = "none";
  setTimeout(() => { if (el.parentNode) el.remove(); }, 450);
}
async function boot() {
  const splashAt = setTimeout(hideSplash, 2200);
  try {
    restoreUi();
    applyTheme(currentThemeId());
    seedSeenVersion();
    if (hasUnseenUpdate()) ui.updateReady = true;
    await Promise.race([refreshGeo(), new Promise(r => setTimeout(r, 2800))]);
    if (ui.role) audit("再次進入", "關閉後重新打開，維持登入");
    render();
    const got = await pullCloud();
    if (got === false) await pushCloud();
    else if (got === "local-newer") await pushCloud();
    restoreUi();
    beatPresence();
    render();
    refreshSky(true).then(() => {
      if (ui.role === "tenant") applySkyDom();
    }).catch(() => {});
    if (ui.role || isInstalledApp()) { enablePush().then(() => maybeNudgeNotifies()).catch(() => {}); armPushAsk(); }
  } catch (err) {
    try { console.error(err); } catch {}
    try { render(); } catch {}
  }
  clearTimeout(splashAt);
  hideSplash();
  const syncTick = async () => {
    try {
      const before = {
        anns: (state.announcements || []).map(a => a.id),
        repairIds: (state.repairs || []).map(r => r.id),
        repairSnap: Object.fromEntries((state.repairs || []).map(r => [r.id, (r.status || "") + "|" + (r.appointAt || "")])),
        renewIds: (state.renewals || []).map(x => x.id)
      };
      const prevUpdated = state.updatedAt;
      const prevSig = coreSig(state);
      const changed = await pullCloud();
      refreshOnlineBadges();
      if (changed === true && state.updatedAt !== prevUpdated && coreSig(state) !== prevSig) {
        notifyCloudChanges(before);
        if (ui.page === "repair" || ui.page === "lease-sign") {
          const ae = document.getElementById("repair-note");
          if (ae) ui.repairNote = ae.value;
          return;
        }
        const ae = document.activeElement;
        if (ae && (ae.id === "repair-note" || ae.tagName === "TEXTAREA" || ae.tagName === "INPUT")) {
          if (ae.id === "repair-note") ui.repairNote = ae.value;
          return;
        }
        ui.keepScroll = true;
        render();
      }
    } catch {}
  };
  setInterval(syncTick, 8000);
  setTimeout(syncTick, 2000);
  setInterval(beatPresence, 25000);
  setInterval(() => { refreshSky().catch(() => {}); }, 15 * 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      beatPresence();
      syncTick();
    }
  });
}
window.addEventListener("pagehide", persistUi);
window.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") persistUi(); });
boot();
