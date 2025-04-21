import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateAccount from "./components/CreateAccount";
import SignIn from "./components/SignIn";
import FinancialNews from "./components/FinancialNews";
import ThreatIntelligence from "./components/ThreatIntelligence";
import MalwareDetection from "./components/MalwareDetection";
import VaultSelection from "./components/VaultSelection";
import About from "./components/About";
import FinancialPasswordVault from "./components/FPV/FinancialPasswordVault";
import Modify from "./components/FPV/Modify";
import Show from "./components/FPV/Show";
import MonthlyFinanceVault from "./components/MFV/MonthlyFinanceVault";
import Edit from "./components/MFV/Edit";
import Show1 from "./components/MFV/Show1";
import Header from "./components/Header";
import ShowAll from "./components/MFV/ShowAll";
import "./app.css";

function App() {
  return (
    <>
    <Header/>
    <div className="main-containter">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/financial-news" element={<FinancialNews />} />
        <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
        <Route path="/malware-detection" element={<MalwareDetection />} />
        <Route path="/about" element={<About />} />
        <Route path="/vaults" element={<VaultSelection />} />
        <Route path="/financial-password-vault" element={<FinancialPasswordVault />} />
        <Route path="/financial-password-vault/modify" element={<Modify />} />
        <Route path="/financial-password-vault/show" element={<Show />} />
        <Route path="/monthly-finance-vault" element={<MonthlyFinanceVault />} />
        <Route path="/monthly-finance-vault/edit" element={<Edit />} />
        <Route path="/monthly-finance-vault/show1" element={<Show1 />} />
        <Route path="/monthly-finance-vault/showall" element={<ShowAll />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
