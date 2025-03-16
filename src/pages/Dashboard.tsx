import { useState, useEffect } from "react";
import { Button, Typography, Stack, TextField } from "@mui/material";

// const Dashboard = () => {
//     const [permission, setPermission] = useState(Notification.permission);
//     const [isSubscribed, setIsSubscribed] = useState(false);
//     const [message, setMessage] = useState("太神啦");
// const url = "https://crm-pwa-server.onrender.com"
//     useEffect(() => {
//         setPermission(Notification.permission);
//         navigator.serviceWorker.ready.then(reg => {
//             reg.pushManager.getSubscription().then(subscription => {
//                 if (subscription) {
//                     console.log("📩 已訂閱:", subscription);
//                     setIsSubscribed(true);
//                 }
//             });
//         });
//     }, []);
//     useEffect(() => {
//         alert("📢 Dashboard 已載入");
//         console.log("📢 Dashboard 已載入");
//     }, []);
//     const urlBase64ToUint8Array = (base64String: string) => {
//         const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//         const base64 = (base64String + padding)
//             .replace(/\-/g, "+")
//             .replace(/_/g, "/");
//         const rawData = atob(base64);
//         return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
//     };

//     // 訂閱推播
//     const subscribePush = async () => {
//         if (!("serviceWorker" in navigator)) {
//             alert("❌ 瀏覽器不支援 Service Worker");
//             return;
//         }

//         try {
//             const reg = await navigator.serviceWorker.ready;
//             const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
//             const subscription = await reg.pushManager.subscribe({
//                 userVisibleOnly: true,
//                 applicationServerKey: urlBase64ToUint8Array(publicKey)
//             });

//             console.log("📩 訂閱成功:", subscription);
//             setIsSubscribed(true);

//             await fetch(`${url}/api/subscribe`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(subscription)
//             });

//             alert("✅ 推播訂閱成功！");
//         } catch (error) {
//             console.error("❌ 訂閱推播失敗:", error);
//             alert("⚠️ 無法訂閱推播！");
//         }
//     };

//     // 取消推播訂閱
//     const unsubscribePush = async () => {
//         try {
//             const reg = await navigator.serviceWorker.ready;
//             const subscription = await reg.pushManager.getSubscription();
    
//             if (!subscription) {
//                 alert("⚠️ 目前沒有訂閱");
//                 return;
//             }
    
//             await fetch(`${url}/api/unsubscribe`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ endpoint: subscription.endpoint }) 
//             });
    
//             // 取消前端的訂閱
//             const success = await subscription.unsubscribe();
//             if (success) {
//                 alert("❌ 已取消訂閱");
//                 setIsSubscribed(false); 
//             } else {
//                 alert("⚠️ 無法取消訂閱");
//             }
//         } catch (error) {
//             console.error("❌ 取消訂閱失敗:", error);
//             alert("⚠️ 無法取消訂閱！");
//         }
//     };
    

//     // 讓後端發送推播
//     const sendNotification = async () => {
//         try {
//             const response = await fetch(`${url}/api/send-notification`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     title: "📢 新推播通知",
//                     body: message, // 使用者輸入的內容
//                 }),
//             });

//             if (response.ok) {
//                 alert("✅ 推播請求成功！");
//             } else {
//                 alert("❌ 推播請求失敗！");
//             }
//         } catch (error) {
//             console.error("❌ 推播請求錯誤:", error);
//             alert("⚠️ 無法發送推播！");
//         }
//     };

//     return (
//         <Stack spacing={2} sx={{ p: 3 }}>
//             <Typography variant="h4">歡迎來到後台管理系統</Typography>
//             <Typography variant="body1">
//                 當前通知權限: <strong>{permission}</strong>
//             </Typography>
//             <Typography variant="body1">
//                 推播狀態: <strong>{isSubscribed ? "✅ 已訂閱" : "❌ 未訂閱"}</strong>
//             </Typography>

//             {permission === "default" && (
//                 <Button variant="contained" color="primary" onClick={() => Notification.requestPermission().then(setPermission)}>
//                     允許通知
//                 </Button>
//             )}

//             {permission === "granted" && (
//                 <>
//                     {!isSubscribed ? (
//                         <Button variant="contained" color="secondary" onClick={subscribePush}>
//                             訂閱推播
//                         </Button>
//                     ) : (
//                         <>
//                             <TextField
//                                 label="推播內容"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                             />
//                             <Button variant="contained" color="success" onClick={sendNotification}>
//                                 發送推播
//                             </Button>
//                             <Button variant="contained" color="error" onClick={unsubscribePush}>
//                                 取消訂閱
//                             </Button>
//                         </>
//                     )}
//                 </>
//             )}

//             {permission === "denied" && (
//                 <Typography color="error.main">通知已被封鎖，請到瀏覽器設定開啟</Typography>
//             )}
//         </Stack>
//     );
// };

// export default Dashboard;
const Dashboard = () => {
    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="h4">歡迎來到後台管理系統</Typography>
            <Typography variant="body1">這是測試版 Dashboard</Typography>
        </Stack>
    );
};
