import React, { useEffect, useMemo, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import logo2 from "../assets/logo.png";
import { assets } from "../assets/assets";


export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    url,
    token,
    setToken,
    logout: contextLogout,
  } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [userName, setUserName] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [savedProfile, setSavedProfile] = useState({ name: "", email: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handlePayment = () => {
    if (selectedMethod === "cod") {
      alert("Order placed successfully with Cash on Delivery!");
    } else {
      alert("Simulated Online Payment Successful!");
    }
  };

  const getInitial = () => {
    if (location?.state?.active) return location.state.active;
    try {
      const q = new URLSearchParams(location.search);
      if (q.get("tab")) return q.get("tab");
    } catch (e) {
      // ignore
    }
    return "overview";
  };
  const fetchUserName = async () => {
    try {
      const res = await axios.get(url + "/api/user/profile", {
        headers: { token },
      });
      setUserName(res.data.data.name || "");
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  };

  const [active, setActive] = useState(getInitial());

  useEffect(() => {
    const newActive = getInitial();
    if (newActive !== active) setActive(newActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.state]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          url + "/api/order/userorders",
          {},
          { headers: { token } }
        );
        const data = response.data.data || [];
        // normalize fields for table display
        setOrders(
          data.map((o) => ({
            id: o._id || o.id,
            date: new Date(o.createdAt).toLocaleDateString(),
            total: o.amount,
            status: o.status,
          }))
        );
      } catch (err) {
        console.error("Failed fetching orders:", err);
        setOrders([]);
      }
    };

    if (token) fetchOrders();
  }, [token, url]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${url}/api/user/useraddresses`, {
        headers: { token },
      });
      if (response.data.success) {
        setAddresses(response.data.address || {});
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    if (active === "addresses" && token) {
      fetchAddresses();
    }
  }, [active, token]);

  const totals = useMemo(() => {
    return {
      totalOrders: orders.length,
      activeOrders: orders.filter(
        (o) => o.status !== "Delivered" && o.status !== "Cancelled"
      ).length,
      spent: orders.reduce((s, o) => s + (o.total || 0), 0),
    };
  }, [orders]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${url}/api/user/userdetails`, {
        headers: { token },
      });
      setProfile({
        name: res.data.user.name,
        email: res.data.user.email,
      });
      setSavedProfile({ name: res.data.name, email: res.data.email });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Improved styles with attached sidebar
  const pageStyle = {
    minHeight: "100vh",
    background: "#f6f0e7",
    boxSizing: "border-box",
    display: "flex",
  };

  const containerStyle = {
    display: "flex",
    width: "100%",
    minHeight: "calc(100vh - 72px)",
  };

  const asideStyle = {
    background: "#ffffff",
    flexShrink: 0,
    width: "280px",
    padding: "0",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
    height: "100vh",
    position: "fixed",
    left: 0,
    borderRight: "1px solid #e5e7eb",
  };

  const mainStyle = {
    flex: 1,
    marginLeft: "280px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    minWidth: "320px",
    maxWidth: "calc(100vw - 280px)",
    boxSizing: "border-box",
  };

  const headerRowStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "24px",
    marginBottom: "8px",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(150,130,100,0.10)",
  };

  const smallCardStyle = {
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(150,130,100,0.08)",
    background: "#fff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  };

  const buttonStyle = {
    padding: "16px 24px",
    borderRadius: "0",
    textAlign: "left",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "15px",
    width: "100%",
    marginBottom: "0",
    display: "flex",
    alignItems: "center",
    gap: "0",
    position: "relative",
    borderBottom: "1px solid #f3f4f6",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    marginTop: "8px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    marginTop: "24px",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Fixed Left Sidebar */}
        <aside style={asideStyle}>
          {/* Header */}
          <div
            style={{
              padding: "32px 24px 24px",
              borderBottom: "2px solid #f1f3f4",
              background: "#fafafa",
            }}
          >
            <img
              className="logo "
              style={{ marginLeft: "5px" }}
              src={logo2}
              alt="logo"
            />
          </div>

          {/* Navigation */}
          <nav>
            {[
              {
                key: "overview",
                label: "Overview",
                action: () => setActive("overview"),
              },
              {
                key: "orders",
                label: "Orders",
                action: () => setActive("orders"),
              },
              {
                key: "profile",
                label: "Profile",
                action: () => setActive("profile"),
              },
              {
                key: "addresses",
                label: "Addresses",
                action: () => setActive("addresses"),
              },
              {
                key: "payment",
                label: "Payment Methods",
                action: () => setActive("payment"),
              },
            ].map((item, index) => (
              <button
                key={item.key}
                onClick={item.action}
                style={{
                  ...buttonStyle,
                  background: active === item.key ? "#f8f4f0" : "#ffffff",
                  color: active === item.key ? "#AB162C" : "#444444",
                  borderLeft:
                    active === item.key
                      ? "4px solid #AB162C"
                      : "4px solid transparent",
                  fontWeight: active === item.key ? "600" : "500",
                }}
                onMouseEnter={(e) => {
                  if (active !== item.key) {
                    e.target.style.background = "#f9f9f9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== item.key) {
                    e.target.style.background = "#ffffff";
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Back to Store Button */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px",
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "#AB162C",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#8b1426";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#AB162C";
                e.target.style.transform = "translateY(0)";
              }}
            >
              ← Back to Store
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main style={mainStyle}>
          {/* Header row with Logout button on the right */}
          <div style={headerRowStyle}>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#111827",
                  letterSpacing: "-0.025em",
                  lineHeight: "1.2",
                }}
              >
                Dashboard
              </h1>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#6b7280",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              >
                Manage your account and orders
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={async () => {
                  try {
                    if (typeof contextLogout === "function") {
                      await contextLogout({ redirect: "/", callApi: true });
                      return;
                    }

                    if (token) {
                      await fetch("/api/auth/logout", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }).catch(() => {});
                    }

                    localStorage.removeItem("token");
                    if (typeof setToken === "function") setToken("");
                    navigate("/", { replace: true });
                  } catch (err) {
                    console.error("Logout failed", err);
                  }
                }}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: "#AB162C",
                  color: "#fff",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-1px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
              >
                Logout
              </button>
            </div>
          </div>

          {active === "overview" && (
            <>
              <section style={cardStyle}>
                <div style={{ marginBottom: "32px" }}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#374151",
                      marginBottom: "8px",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Welcome back 👋
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: "#6b7280",
                      fontSize: "16px",
                      lineHeight: "1.5",
                    }}
                  >
                    Quick snapshot of your account activity
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div style={smallCardStyle}>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500",
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Active Orders
                    </div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        color: "#111827",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {totals.activeOrders}
                    </div>
                  </div>

                  <div style={smallCardStyle}>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500",
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Total Orders
                    </div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        color: "#111827",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {totals.totalOrders}
                    </div>
                  </div>

                  <div style={smallCardStyle}>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500",
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Total Spent
                    </div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        color: "#111827",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      ₹{totals.spent.toLocaleString()}
                    </div>
                  </div>
                </div>
              </section>

              <section style={cardStyle}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Recent Orders
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "14px",
                    marginBottom: "24px",
                  }}
                >
                  Your latest order activity
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        {["Order ID", "Date", "Total", "Status"].map(
                          (header, index) => (
                            <th
                              key={header}
                              style={{
                                padding: "16px 20px",
                                textAlign: "left",
                                fontSize: "14px",
                                color: "#374151",
                                fontWeight: "600",
                                borderTop:
                                  index === 0 ? "1px solid #e5e7eb" : "none",
                                borderBottom: "1px solid #e5e7eb",
                                borderLeft:
                                  index === 0 ? "1px solid #e5e7eb" : "none",
                                borderRight: "1px solid #e5e7eb",
                                borderTopLeftRadius: index === 0 ? "8px" : "0",
                                borderTopRightRadius: index === 3 ? "8px" : "0",
                              }}
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody style={{ background: "#ffffff" }}>
                      {orders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            style={{
                              padding: "40px 20px",
                              textAlign: "center",
                              color: "#6b7280",
                              fontSize: "14px",
                              borderLeft: "1px solid #e5e7eb",
                              borderRight: "1px solid #e5e7eb",
                              borderBottom: "1px solid #e5e7eb",
                              borderBottomLeftRadius: "8px",
                              borderBottomRightRadius: "8px",
                            }}
                          >
                            No orders found
                          </td>
                        </tr>
                      ) : (
                        orders.map((o, index) => (
                          <tr
                            key={o.id}
                            style={{
                              borderBottom:
                                index === orders.length - 1
                                  ? "none"
                                  : "1px solid #f3f4f6",
                            }}
                          >
                            <td
                              style={{
                                padding: "16px 20px",
                                fontSize: "14px",
                                color: "#374151",
                                fontWeight: "500",
                                borderLeft: "1px solid #e5e7eb",
                                borderBottom:
                                  index === orders.length - 1
                                    ? "1px solid #e5e7eb"
                                    : "none",
                                borderBottomLeftRadius:
                                  index === orders.length - 1 ? "8px" : "0",
                              }}
                            >
                              {o.id}
                            </td>
                            <td
                              style={{
                                padding: "16px 20px",
                                fontSize: "14px",
                                color: "#6b7280",
                                borderBottom:
                                  index === orders.length - 1
                                    ? "1px solid #e5e7eb"
                                    : "none",
                              }}
                            >
                              {o.date}
                            </td>
                            <td
                              style={{
                                padding: "16px 20px",
                                fontSize: "14px",
                                color: "#374151",
                                fontWeight: "600",
                                borderBottom:
                                  index === orders.length - 1
                                    ? "1px solid #e5e7eb"
                                    : "none",
                              }}
                            >
                              ₹{o.total?.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "16px 20px",
                                borderRight: "1px solid #e5e7eb",
                                borderBottom:
                                  index === orders.length - 1
                                    ? "1px solid #e5e7eb"
                                    : "none",
                                borderBottomRightRadius:
                                  index === orders.length - 1 ? "8px" : "0",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "6px 12px",
                                  borderRadius: "20px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  background:
                                    o.status === "Delivered"
                                      ? "#ECFDF5"
                                      : o.status === "Preparing"
                                      ? "#FFFBEB"
                                      : "#FFF1F2",
                                  color:
                                    o.status === "Delivered"
                                      ? "#065F46"
                                      : o.status === "Preparing"
                                      ? "#92400E"
                                      : "#991B1B",
                                }}
                              >
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {active === "profile" && (
            <section style={cardStyle}>
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Account Details
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Update your personal information
                </p>
              </div>

              <div style={{ display: "grid", gap: "24px", maxWidth: "600px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      color: "#374151",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      ":focus": {
                        borderColor: "#AB162C",
                        boxShadow: "0 0 0 3px rgba(171, 22, 44, 0.1)",
                      },
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      color: "#374151",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    style={inputStyle}
                    placeholder="Enter your email"
                  />
                </div>

                <div
                  style={{ display: "flex", gap: "16px", marginTop: "16px" }}
                >
                  <button
                    onClick={async () => {
                      try {
                        const res = await axios.put(
                          `${url}/api/user/updateprofile`,
                          {
                            name: profile.name,
                            email: profile.email,
                          },
                          { headers: { token } }
                        );
                        setSavedProfile({ ...profile });
                        setProfile({ ...profile });
                        alert(res.data.message);
                      } catch (error) {
                        console.error(error);
                        alert("Failed to update profile info");
                      }
                    }}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "12px",
                      background: "#AB162C",
                      color: "#fff",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setProfile(savedProfile)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      background: "#fff",
                      color: "#374151",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <hr style={{ margin: "0px 0", borderColor: "#E5E7EB" }} />

                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "12px",
                    }}
                  >
                    Profile Picture
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "#f3f4f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={
                          avatarPreview ||
                          (profile.avatar && `${url}/${profile.avatar}`) ||
                          assets.profile_icon
                        }
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setAvatarFile(file);
                          const reader = new FileReader();
                          reader.onload = (ev) =>
                            setAvatarPreview(ev.target.result);
                          reader.readAsDataURL(file);
                        }}
                      />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={async () => {
                            if (!avatarFile)
                              return alert("Choose an image first");
                            try {
                              const fd = new FormData();
                              fd.append("avatar", avatarFile);
                              const res = await axios.post(
                                `${url}/api/user/upload-avatar`,
                                fd,
                                {
                                  headers: { token }, // do not set Content-Type — axios will set multipart
                                }
                              );
                              if (res.data.success) {
                                // update profile state so avatar shows elsewhere
                                setProfile({
                                  ...profile,
                                  avatar: res.data.avatar,
                                });
                                setAvatarPreview("");
                                setAvatarFile(null);
                                alert("Avatar uploaded ✅");
                              } else {
                                alert(res.data.message || "Upload failed");
                              }
                            } catch (err) {
                              console.error(err);
                              alert("Upload error");
                            }
                          }}
                          style={{
                            padding: "10px 18px",
                            background: "#AB162C",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Upload Picture
                        </button>

                        <button
                          onClick={() => {
                            setAvatarFile(null);
                            setAvatarPreview("");
                          }}
                          style={{
                            padding: "10px 18px",
                            background: "#fff",
                            border: "1px solid #E5E7EB",
                            borderRadius: 8,
                            color: "#374151",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "16px",
                    }}
                  >
                    Change Password
                  </h3>

                  <div
                    style={{ display: "grid", gap: "16px", maxWidth: "400px" }}
                  >
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        const res = await axios.put(
                          `${url}/api/user/changepassword`,
                          { oldPassword, newPassword },
                          { headers: { token } }
                        );
                        alert(res.data.message);
                        setOldPassword("");
                        setNewPassword("");
                      } catch (error) {
                        console.error(error);
                        alert("Failed to update password");
                      }
                    }}
                    style={{
                      marginTop: "20px",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      background: "#AB162C",
                      color: "#fff",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </section>
          )}

          {active === "orders" && (
            <section style={cardStyle}>
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  All Orders
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Complete history of your orders
                </p>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["Order ID", "Date", "Total", "Status"].map(
                        (header, index) => (
                          <th
                            key={header}
                            style={{
                              padding: "16px 20px",
                              textAlign: "left",
                              fontSize: "14px",
                              color: "#374151",
                              fontWeight: "600",
                              borderTop: "1px solid #e5e7eb",
                              borderBottom: "1px solid #e5e7eb",
                              borderLeft:
                                index === 0 ? "1px solid #e5e7eb" : "none",
                              borderRight: "1px solid #e5e7eb",
                              borderTopLeftRadius: index === 0 ? "8px" : "0",
                              borderTopRightRadius: index === 3 ? "8px" : "0",
                            }}
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody style={{ background: "#ffffff" }}>
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            padding: "40px 20px",
                            textAlign: "center",
                            color: "#6b7280",
                            fontSize: "14px",
                            borderLeft: "1px solid #e5e7eb",
                            borderRight: "1px solid #e5e7eb",
                            borderBottom: "1px solid #e5e7eb",
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px",
                          }}
                        >
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.map((o, index) => (
                        <tr key={o.id}>
                          <td
                            style={{
                              padding: "16px 20px",
                              fontSize: "14px",
                              color: "#374151",
                              fontWeight: "500",
                            }}
                          >
                            {o.id}
                          </td>
                          <td
                            style={{
                              padding: "16px 20px",
                              fontSize: "14px",
                              color: "#6b7280",
                            }}
                          >
                            {o.date}
                          </td>
                          <td
                            style={{
                              padding: "16px 20px",
                              fontSize: "14px",
                              color: "#374151",
                              fontWeight: "600",
                            }}
                          >
                            ₹{o.total?.toLocaleString()}
                          </td>
                          <td style={{ padding: "16px 20px" }}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "6px 12px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "600",
                                background:
                                  o.status === "Delivered"
                                    ? "#ECFDF5"
                                    : o.status === "Preparing"
                                    ? "#FFFBEB"
                                    : "#FFF1F2",
                                color:
                                  o.status === "Delivered"
                                    ? "#065F46"
                                    : o.status === "Preparing"
                                    ? "#92400E"
                                    : "#991B1B",
                              }}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {active === "addresses" && (
            <section style={cardStyle}>
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Saved Address
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  View or update your delivery address
                </p>
              </div>

              <div style={{ display: "grid", gap: "20px", maxWidth: "500px" }}>
                <input
                  placeholder="Street"
                  value={addresses?.street || ""}
                  onChange={(e) =>
                    setAddresses({ ...addresses, street: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  placeholder="City"
                  value={addresses?.city || ""}
                  onChange={(e) =>
                    setAddresses({ ...addresses, city: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  placeholder="Pincode"
                  value={addresses?.pincode || ""}
                  onChange={(e) =>
                    setAddresses({ ...addresses, pincode: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />

                <button
                  onClick={async () => {
                    try {
                      await axios.put(
                        url + "/api/user/update-address",
                        {
                          street: addresses.street,
                          city: addresses.city,
                          pincode: addresses.pincode,
                        },
                        { headers: { token } }
                      );

                      alert("Address updated successfully ✅");
                    } catch (err) {
                      console.error("Failed updating address:", err);
                      alert("Failed to update address");
                    }
                  }}
                  style={{
                    background: "#AB162C",
                    color: "#fff",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  Save Address
                </button>
              </div>
            </section>
          )}
          {active === "payment" && (
            <section style={cardStyle}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#222",
                  marginBottom: "6px",
                }}
              >
                Payment Method
              </h2>
              <p
                style={{
                  color: "#666",
                  marginBottom: "20px",
                  fontSize: "0.95rem",
                }}
              >
                Choose how you want to pay for your order
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    backgroundColor:
                      selectedMethod === "cod"
                        ? "rgba(160,25,26,0.05)"
                        : "#fff",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedMethod === "cod"}
                    onChange={() => setSelectedMethod("cod")}
                    style={{ marginRight: "10px" }}
                  />
                  Cash on Delivery (COD)
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    backgroundColor:
                      selectedMethod === "online"
                        ? "rgba(160,25,26,0.05)"
                        : "#fff",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={selectedMethod === "online"}
                    onChange={() => setSelectedMethod("online")}
                    style={{ marginRight: "10px" }}
                  />
                  Online Payment (Simulated)
                </label>
              </div>

              <button
                onClick={handlePayment}
                style={{
                  marginTop: "25px",
                  backgroundColor: "#A0191A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 28px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#8C1618")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#A0191A")
                }
              >
                Proceed to Pay
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
