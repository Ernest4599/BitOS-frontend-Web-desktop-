import { User, CreditCard, Crown, Brain, Shield, Sliders, HelpCircle, FileText, LogOut, Fingerprint, AtSign, Lock, Sparkles, ChevronRight, Copy, Mail, Phone, Smartphone, Trash2, PauseCircle, ArrowLeft, UserCheck, Lightbulb, MapPin, CheckCircle2, Gift, Headphones, History, Check, Plus, Search, Download, Filter } from "lucide-react"
import { useState } from "react"

const categories = [
  {
    section: "ACCOUNT",
    items: [
      { id: "account", label: "Account settings", icon: User },
      { id: "billing", label: "Billing", icon: CreditCard },
      { id: "subscriptions", label: "Subscriptions", icon: Crown },
    ],
  },
  {
    section: "PREFERENCES",
    items: [
      { id: "capabilities", label: "Capabilities", icon: Brain },
      { id: "privacy", label: "Privacy", icon: Shield },
      { id: "preferences", label: "Preferences", icon: Sliders },
    ],
  },
  {
    section: "SUPPORT",
    items: [
      { id: "help", label: "Help & support", icon: HelpCircle },
      { id: "terms", label: "Terms & services", icon: FileText },
    ],
  },
]

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("account")
  const [view, setView] = useState<"account" | "profileId" | "contactInfo" | "billing" | "currentPlan" | "paymentMethods" | "billingInfo" | "billingHistory">("account")

  function CategorySidebar() {
    return (
      <div className="w-56 flex-shrink-0">
        <h1 className="text-lg font-bold mb-4">SETTINGS</h1>

        {categories.map((group) => (
          <div key={group.section} className="mb-5">
            <p className="text-[10px] font-semibold text-gray-500 tracking-wide mb-1.5">{group.section}</p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeCategory === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id)
                      if (item.id === "billing") setView("billing")
                      else if (item.id === "account") setView("account")
                    }}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-cyan-500/10 text-cyan-400" : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={15} />
                      {item.label}
                    </span>
                    <ChevronRight size={13} className="text-gray-600" />
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <button className="flex items-center gap-2 border border-red-500/30 text-red-400 text-sm font-medium px-4 py-2.5 rounded-lg mt-4 w-full justify-center hover:bg-red-500/10">
          <LogOut size={15} />
          Log out
        </button>
      </div>
    )
  }

  function ProfileIdContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("account")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-xl font-bold">Profile ID</h2>
        <p className="text-sm text-gray-500 mt-1">Your bitOS ID is your unique identity on bitOS.</p>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-5 mt-5 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold text-center leading-tight flex-shrink-0">
            bitOS<br />ID
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-gray-500">YOUR bitOS ID</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-cyan-400 tracking-wider">83947261</span>
              <button>
                <Copy size={14} className="text-gray-500" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This is your private bitOS identity number. It is used to secure your account and verify payments, authentication and authorization activities.
            </p>
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3">
          <p className="text-sm font-semibold mb-3">How it works</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <UserCheck size={15} />
              </div>
              <div>
                <p className="text-sm font-medium">Unique</p>
                <p className="text-xs text-gray-500">Your ID is unique and belongs only to you.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Lock size={15} />
              </div>
              <div>
                <p className="text-sm font-medium">Private & secure</p>
                <p className="text-xs text-gray-500">Used only for account security, payments and authorization. Never shared publicly.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Shield size={15} />
              </div>
              <div>
                <p className="text-sm font-medium">Always yours</p>
                <p className="text-xs text-gray-500">Once set, your ID is yours to keep. You can update it anytime.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 mt-3 flex items-start gap-3">
          <Lightbulb size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Good to know</p>
            <p className="text-xs text-gray-500 mt-0.5">Your bitOS ID is private. It is never shown on your profile or shared with other users.</p>
          </div>
        </div>
      </div>
    )
  }

  function ContactInfoContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("account")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-xl font-bold">Contact Information</h2>
        <p className="text-sm text-gray-500 mt-1">Manage and verify your contact details.</p>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Email</p>
              <p className="text-xs text-gray-400 mt-0.5">yourmail@gmail.com</p>
              <span className="flex items-center gap-1 text-[11px] text-green-400 mt-1">
                <CheckCircle2 size={12} />
                Verified
              </span>
            </div>
          </div>
          <button className="border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-cyan-400/10 flex-shrink-0">
            Edit email
          </button>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Phone number</p>
              <p className="text-xs text-gray-400 mt-0.5">+234 812 345 6789</p>
              <span className="flex items-center gap-1 text-[11px] text-green-400 mt-1">
                <CheckCircle2 size={12} />
                Verified
              </span>
            </div>
          </div>
          <button className="border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-cyan-400/10 flex-shrink-0">
            Edit phone number
          </button>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Address</p>
              <p className="text-xs text-gray-400 mt-0.5">23 Innovation Drive<br />Victoria Island, Lagos<br />Nigeria</p>
              <span className="flex items-center gap-1 text-[11px] text-green-400 mt-1">
                <CheckCircle2 size={12} />
                Verified
              </span>
            </div>
          </div>
          <button className="border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-cyan-400/10 flex-shrink-0">
            Edit address
          </button>
        </div>

        <div className="bg-white/5 rounded-xl p-4 mt-3 flex items-start gap-3">
          <Shield size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Your contact information is kept secure</p>
            <p className="text-xs text-gray-500 mt-0.5">We use your contact details to secure your account and keep you updated about important activity.</p>
          </div>
        </div>
      </div>
    )
  }

  function BillingContent() {
    return (
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold">Billing</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your payment methods, billing information and view your billing history.</p>

        <button
          onClick={() => setView("currentPlan")}
          className="w-full bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Gift size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Current Plan</p>
              <p className="text-xs text-gray-500">View your current plan and upgrade.</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-semibold">bitOS Free</p>
            <p className="text-xs text-gray-500">₦0 / month</p>
          </div>
        </button>

        <button
          onClick={() => setView("paymentMethods")}
          className="w-full bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
              <CreditCard size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Payment Methods</p>
              <p className="text-xs text-gray-500">Add, edit or remove your payment methods.</p>
            </div>
          </div>
          <span className="text-xs text-red-400 flex-shrink-0">No method added</span>
        </button>

        <button
          onClick={() => setView("billingInfo")}
          className="w-full bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Billing Information</p>
              <p className="text-xs text-gray-500">Manage your billing name, email and address.</p>
            </div>
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0">Not added</span>
        </button>

        <button
          onClick={() => setView("billingHistory")}
          className="w-full bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <History size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Billing History</p>
              <p className="text-xs text-gray-500">View your invoices and transaction history.</p>
            </div>
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0">No history yet</span>
        </button>

        <div className="bg-white/5 rounded-xl p-4 mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Headphones size={18} className="text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Need help with a payment?</p>
              <p className="text-xs text-gray-500">Our support team is here to help you.</p>
            </div>
          </div>
          <button className="border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0 hover:bg-cyan-400/10">
            Contact Support
          </button>
        </div>
      </div>
    )
  }

  function CurrentPlanContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("billing")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-xl font-bold">Current Plan</h2>
        <p className="text-sm text-gray-500 mt-1">View your current plan and upgrade anytime.</p>

        <div className="flex gap-4 mt-5 flex-wrap">
          <div className="flex-1 min-w-[240px] bg-[#0f141c] border border-[#1c2432] rounded-xl p-5">
            <p className="text-xs text-gray-500">Your current plan</p>
            <p className="text-lg font-bold mt-1">bitOS Free</p>
            <p className="text-2xl font-bold mt-2">₦0<span className="text-sm text-gray-500 font-normal"> / month</span></p>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={14} className="text-green-400" />
                Access to bitOS feed
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={14} className="text-green-400" />
                Basic AI assistance (limited)
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={14} className="text-green-400" />
                Community access
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={14} className="text-green-400" />
                Standard support
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[240px] bg-[#0f141c] border border-[#1c2432] rounded-xl p-5">
            <Gift size={24} className="text-purple-400" />
            <p className="text-sm font-semibold mt-3">Unlock more with bitOS Pro</p>
            <p className="text-xs text-gray-500 mt-1">Get access to advanced AI, personalization, priority support and more.</p>
            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold py-2.5 rounded-lg mt-4">
              Upgrade to bitOS Pro
            </button>
            <button className="text-xs text-cyan-400 mt-2">Learn more about Pro →</button>
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Next billing date</p>
            <p className="text-xs text-gray-500">You're on the Free plan.</p>
          </div>
          <span className="text-sm font-semibold">₦0 will be charged</span>
        </div>
      </div>
    )
  }

  function PaymentMethodsContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("billing")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-xl font-bold">Payment Methods</h2>
        <p className="text-sm text-gray-500 mt-1">Add, edit or remove your payment methods.</p>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl mt-5 py-16 flex flex-col items-center text-center px-6">
          <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
            <CreditCard size={26} className="text-purple-400" />
          </div>
          <h3 className="text-base font-semibold">No payment method added</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">Add a payment method for subscriptions and purchases.</p>
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold px-4 py-2.5 rounded-lg mt-5">
            <Plus size={15} />
            Add payment method
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
          <Shield size={13} />
          Your payment information is secure and encrypted.
        </div>
      </div>
    )
  }

  function BillingInfoContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("billing")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-xl font-bold">Billing Information</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your billing name, email and address.</p>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl mt-5 py-16 flex flex-col items-center text-center px-6">
          <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
            <FileText size={26} className="text-green-400" />
          </div>
          <h3 className="text-base font-semibold">No billing information added</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">Add your billing name, email and address for invoices.</p>
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold px-4 py-2.5 rounded-lg mt-5">
            <Plus size={15} />
            Add billing information
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
          <Shield size={13} />
          This information is used for billing and invoice purposes only.
        </div>
      </div>
    )
  }

  function BillingHistoryContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("billing")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Billing History</h2>
            <p className="text-sm text-gray-500 mt-1">View your invoices and transaction history.</p>
          </div>
          <button className="flex items-center gap-2 border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-2 rounded-lg hover:bg-cyan-400/10 flex-shrink-0">
            <Download size={14} />
            Download all
          </button>
        </div>

        <div className="relative mt-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full bg-[#0f141c] border border-[#1c2432] rounded-lg py-2 pl-9 pr-4 text-sm placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl mt-3 py-16 flex flex-col items-center text-center px-6">
          <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
            <History size={26} className="text-orange-400" />
          </div>
          <h3 className="text-base font-semibold">No invoices to display</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">Your billing history will appear here once you have transactions.</p>
        </div>
      </div>
    )
  }

  function BillingHistoryContent() {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setView("billing")} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Billing History</h2>
            <p className="text-sm text-gray-500 mt-1">View your invoices and transaction history.</p>
          </div>
          <button className="flex items-center gap-2 border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-2 rounded-lg hover:bg-cyan-400/10 flex-shrink-0">
            <Download size={14} />
            Download all
          </button>
        </div>

        <div className="relative mt-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full bg-[#0f141c] border border-[#1c2432] rounded-lg py-2 pl-9 pr-4 text-sm placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl mt-3 py-16 flex flex-col items-center text-center px-6">
          <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
            <History size={26} className="text-orange-400" />
          </div>
          <h3 className="text-base font-semibold">No invoices to display</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">Your billing history will appear here once you have transactions.</p>
        </div>
      </div>
    )
  }

  function AccountContent() {
    return (
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold">Account settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account, security and personal information.</p>

        <button
          onClick={() => setView("profileId")}
          className="w-full bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-5 flex items-center justify-between gap-4 flex-wrap hover:bg-white/[0.02] text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Fingerprint size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Profile ID</p>
              <p className="text-xs text-gray-500">Get your unique bitOS ID.</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-gray-500">Your bitOS ID</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm text-gray-500 tracking-widest">••••••••</span>
            </div>
          </div>

          <span className="border border-cyan-400/40 text-cyan-400 text-xs font-medium px-3 py-1.5 rounded-lg">
            View ID
          </span>
        </button>

        <button
          onClick={() => setView("contactInfo")}
          className="w-full bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex gap-4 text-left hover:bg-white/[0.02]"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <AtSign size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Contact information</p>
            <p className="text-xs text-gray-500">Add and verify your contacts.</p>
          </div>
          <ChevronRight size={16} className="text-gray-600 flex-shrink-0 self-center" />
        </button>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 flex-shrink-0">
            <Lock size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Password & security</p>
            <p className="text-xs text-gray-500 mb-3">Keep your account protected.</p>

            <button className="w-full flex items-center justify-between py-2.5 border-t border-[#1c2432]">
              <span className="flex items-center gap-2 text-sm">
                <Lock size={15} className="text-gray-400" />
                Change password
              </span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
            <button className="w-full flex items-center justify-between py-2.5 border-t border-[#1c2432]">
              <span className="flex items-center gap-2 text-sm">
                <Smartphone size={15} className="text-gray-400" />
                Devices & login sessions
              </span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
            <button className="w-full flex items-center justify-between py-2.5 border-t border-[#1c2432]">
              <span className="flex items-center gap-2 text-sm text-red-400">
                <Trash2 size={15} />
                Clear devices
              </span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 mt-3 flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
            <Sparkles size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Account ownership</p>
            <p className="text-xs text-gray-500 mb-3">Manage ownership of your account.</p>

            <button className="w-full flex items-center justify-between py-2.5 border-t border-[#1c2432]">
              <span className="flex items-center gap-2 text-sm text-orange-400">
                <PauseCircle size={15} />
                Deactivate account
              </span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
            <button className="w-full flex items-center justify-between py-2.5 border-t border-[#1c2432]">
              <span className="flex items-center gap-2 text-sm text-red-400">
                <Trash2 size={15} />
                Delete account
              </span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-6">
      <CategorySidebar />
      {view === "account" && <AccountContent />}
      {view === "profileId" && <ProfileIdContent />}
      {view === "contactInfo" && <ContactInfoContent />}
      {view === "billing" && <BillingContent />}
      {view === "currentPlan" && <CurrentPlanContent />}
      {view === "paymentMethods" && <PaymentMethodsContent />}
      {view === "billingInfo" && <BillingInfoContent />}
      {view === "billingHistory" && <BillingHistoryContent />}
    </div>
  )
}
