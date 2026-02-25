import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { checkAdminCredentials, setAdminAuthenticated, isAdminAuthenticated } from "@/lib/admin-auth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (checkAdminCredentials(id, password)) {
      setAdminAuthenticated();
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-lg">
        <h1 className="text-xl font-bold text-primary mb-2">관리자 로그인</h1>
        <p className="text-sm text-muted-foreground mb-6">WiseIN 관리자 페이지</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-id" className="block text-sm font-medium text-foreground mb-1.5">
              아이디
            </label>
            <input
              id="admin-id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="아이디"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="admin-pw" className="block text-sm font-medium text-foreground mb-1.5">
              비밀번호
            </label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="비밀번호"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
