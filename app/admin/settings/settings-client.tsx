"use client";

import { useState } from "react";
import { User, Lock, Save, Check } from "lucide-react";

type UserData = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export function SettingsClient({ user }: { user: UserData }) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email });
  const [pwd, setPwd] = useState({ current: "", new: "", confirm: "" });
  const [profileStatus, setProfileStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pwdStatus, setPwdStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [profileError, setProfileError] = useState("");
  const [pwdError, setPwdError] = useState("");

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileStatus("saving");
    setProfileError("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: profile.name, email: profile.email }),
    });
    if (res.ok) {
      setProfileStatus("saved");
      setTimeout(() => setProfileStatus("idle"), 2500);
    } else {
      const data = await res.json();
      setProfileError(data.error ?? "Failed to save");
      setProfileStatus("error");
    }
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      setPwdError("Passwords do not match");
      return;
    }
    if (pwd.new.length < 8) {
      setPwdError("Password must be at least 8 characters");
      return;
    }
    setPwdStatus("saving");
    setPwdError("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.new }),
    });
    if (res.ok) {
      setPwdStatus("saved");
      setPwd({ current: "", new: "", confirm: "" });
      setTimeout(() => setPwdStatus("idle"), 2500);
    } else {
      const data = await res.json();
      setPwdError(data.error ?? "Failed to update password");
      setPwdStatus("error");
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account details</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-base">Profile</h2>
              <p className="text-xs text-muted-foreground">Update your name and email</p>
            </div>
          </div>

          {profileError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">{profileError}</div>
          )}

          <form onSubmit={saveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs tracking-wider uppercase text-muted-foreground">Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs tracking-wider uppercase text-muted-foreground">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div className="pt-1">
              <button
                type="submit"
                disabled={profileStatus === "saving"}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                {profileStatus === "saved" ? (
                  <><Check className="w-4 h-4" /> Saved</>
                ) : (
                  <><Save className="w-4 h-4" /> {profileStatus === "saving" ? "Saving..." : "Save Profile"}</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Password */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-purple-400/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="font-serif text-base">Password</h2>
              <p className="text-xs text-muted-foreground">Change your login password</p>
            </div>
          </div>

          {pwdError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">{pwdError}</div>
          )}

          <form onSubmit={savePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs tracking-wider uppercase text-muted-foreground">Current Password</label>
              <input
                type="password"
                value={pwd.current}
                onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs tracking-wider uppercase text-muted-foreground">New Password</label>
              <input
                type="password"
                value={pwd.new}
                onChange={(e) => setPwd((p) => ({ ...p, new: e.target.value }))}
                className="input-field"
                required
                minLength={8}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs tracking-wider uppercase text-muted-foreground">Confirm New Password</label>
              <input
                type="password"
                value={pwd.confirm}
                onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div className="pt-1">
              <button
                type="submit"
                disabled={pwdStatus === "saving"}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                {pwdStatus === "saved" ? (
                  <><Check className="w-4 h-4" /> Updated</>
                ) : (
                  <><Lock className="w-4 h-4" /> {pwdStatus === "saving" ? "Updating..." : "Update Password"}</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Account info */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-serif text-base mb-4">Account Info</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Account ID</dt>
              <dd className="font-mono text-xs">{user.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Member since</dt>
              <dd>{new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
