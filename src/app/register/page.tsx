"use client";

import React, { useState } from 'react';

// 1. DEFINISI TIPE DATA (Agar 0 Error)
interface FormData {
  nama: string; tempatLahir: string; tanggalLahir: string; jenisKelamin: string;
  pekerjaan: string; beratBadan: string; tinggiBadan: string; golDarah: string;
  alamat: string; penyakit: string; namaOrangTua: string; wa: string; pekerjaanOrangTua: string;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    nama: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: 'Laki-laki',
    pekerjaan: '', beratBadan: '', tinggiBadan: '', golDarah: '',
    alamat: '', penyakit: '', namaOrangTua: '', wa: '', pekerjaanOrangTua: ''
  });

  // 2. FUNGSI KIRIM DATA (Serba Internet)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // MASUKKAN URL GOOGLE SCRIPT ANDA DI SINI
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCnmsrjDAJBaZ4xQLBEBR6aQGg0EwN-hniAb9rg9G9pXkS39Dz2v12cdsHtKpLgLMcjw/exec";

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      alert("🎉 Sukses! Data pendaftaran Anda telah tersimpan di Cloud Dojo Yudhistira.");
      window.location.reload(); 
    } catch (error) {
      alert("Koneksi gagal, silakan cek internet Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4 py-12 selection:bg-red-500/30">
      {/* Ornamen Latar Belakang (UX Visual) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Card Utama (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl transition-all duration-700">
        
        <header className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Official Registration
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-1">DOJO YUDHISTIRA</h1>
          <p className="text-slate-400 text-sm font-medium">Lengkapi data untuk bergabung bersama kami.</p>
        </header>

        {/* Progress Bar (Indikator Step) */}
        <div className="flex gap-3 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${step >= i ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]' : 'bg-slate-800'}`}></div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: DATA PRIBADI */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
              <Input label="Nama Lengkap" value={formData.nama} onChange={(v) => setFormData({...formData, nama: v})} placeholder="Sesuai Identitas" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Tempat Lahir" value={formData.tempatLahir} onChange={(v) => setFormData({...formData, tempatLahir: v})} placeholder="Kota" />
                <Input label="Tanggal Lahir" type="date" value={formData.tanggalLahir} onChange={(v) => setFormData({...formData, tanggalLahir: v})} />
              </div>

              {/* FITUR JENIS KELAMIN (MODERN) */}
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-3 ml-1 tracking-widest group-focus-within:text-red-500 transition-colors">Jenis Kelamin</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Laki-laki', 'Perempuan'].map((jk) => (
                    <button 
                      key={jk} 
                      type="button"
                      onClick={() => setFormData({...formData, jenisKelamin: jk})}
                      className={`py-4 rounded-2xl font-bold text-sm transition-all border ${formData.jenisKelamin === jk ? 'bg-white text-black border-white shadow-xl scale-[1.02]' : 'bg-slate-800/40 text-slate-400 border-slate-700 hover:border-slate-500'}`}
                    >
                      {jk}
                    </button>
                  ))}
                </div>
              </div>

              <Input label="Pekerjaan / Sekolah" value={formData.pekerjaan} onChange={(v) => setFormData({...formData, pekerjaan: v})} placeholder="Contoh: Pelajar SMA 1" />
              
              <button type="button" onClick={() => setStep(2)} className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-2xl">
                LANJUTKAN KE DATA FISIK
              </button>
            </div>
          )}

          {/* STEP 2: DATA FISIK & ALAMAT */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-2 gap-5">
                <Input label="Berat (Kg)" type="number" value={formData.beratBadan} onChange={(v) => setFormData({...formData, beratBadan: v})} placeholder="00" />
                <Input label="Tinggi (Cm)" type="number" value={formData.tinggiBadan} onChange={(v) => setFormData({...formData, tinggiBadan: v})} placeholder="000" />
              </div>
              <Input label="Golongan Darah" value={formData.golDarah} onChange={(v) => setFormData({...formData, golDarah: v})} placeholder="A / B / AB / O" />
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">Alamat Lengkap</label>
                <textarea 
                  value={formData.alamat}
                  onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                  className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-red-500/50 outline-none transition-all min-h-[100px]"
                  placeholder="Nama jalan, RT/RW, Kecamatan..."
                />
              </div>
              <Input label="Riwayat Penyakit" value={formData.penyakit} onChange={(v) => setFormData({...formData, penyakit: v})} placeholder="Tulis 'Tidak Ada' jika sehat" />
              
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-800 py-5 rounded-2xl font-bold hover:bg-slate-700 transition-all">BALIK</button>
                <button type="button" onClick={() => setStep(3)} className="flex-[2] bg-white text-black font-black py-5 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-2xl">LANJUTKAN</button>
              </div>
            </div>
          )}

          {/* STEP 3: DATA WALI */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
              <Input label="Nama Orang Tua / Wali" value={formData.namaOrangTua} onChange={(v) => setFormData({...formData, namaOrangTua: v})} placeholder="Nama Ayah / Ibu" />
              <Input label="Nomor WhatsApp (Aktif)" type="tel" value={formData.wa} onChange={(v) => setFormData({...formData, wa: v})} placeholder="0812xxxx" />
              <Input label="Pekerjaan Orang Tua" value={formData.pekerjaanOrangTua} onChange={(v) => setFormData({...formData, pekerjaanOrangTua: v})} placeholder="Contoh: Karyawan" />
              
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(2)} className="flex-1 bg-slate-800 py-5 rounded-2xl font-bold hover:bg-slate-700 transition-all">BALIK</button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] bg-red-600 font-black py-5 rounded-2xl hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      MENGIRIM KE CLOUD...
                    </>
                  ) : "KIRIM SEKARANG"}
                </button>
              </div>
            </div>
          )}
        </form>

        <footer className="mt-10 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          &copy; 2026 RAZAQOLOGY x DOJO YUDHISTIRA
        </footer>
      </div>
    </div>
  );
}

// 3. KOMPONEN INPUT ESTETIK (Reuseable)
function Input({ label, value, onChange, type = "text", placeholder = "" }: { 
  label: string, 
  value: string, 
  onChange: (v: string) => void, 
  type?: string,
  placeholder?: string
}) {
  return (
    <div className="group">
      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 group-focus-within:text-red-500 transition-all tracking-widest">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-red-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
      />
    </div>
  );
}