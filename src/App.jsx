import { useState } from 'react'
import './App.css'

const moods = [
  { id: 'berat', label: 'Berat', m: 'M8 16c2-2 6-2 8 0' },
  { id: 'biasa', label: 'Biasa', m: 'M8 15h8' },
  { id: 'tenang', label: 'Tenang', m: 'M8 14c2 1.5 6 1.5 8 0' },
  { id: 'baik', label: 'Baik', m: 'M8 13.5c2 2.5 6 2.5 8 0' },
  { id: 'semangat', label: 'Semangat', m: 'M7.5 13c2 4 7 4 9 0z' },
]
const acts = ['Belajar', 'Bekerja', 'Olahraga', 'Memasak', 'Beres-beres', 'Bertemu teman', 'Istirahat']

const now = new Date()
const h = now.getHours()
const greet = h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam'
const tanggal = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export default function App() {
  const [f, setF] = useState({ nama: '', mood: '', tidur: 7, energi: 6, aktivitas: [], catatan: '' })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => { setF((p) => ({ ...p, [k]: v })); setSaved(false) }
  const toggle = (a) => set('aktivitas', f.aktivitas.includes(a) ? f.aktivitas.filter((x) => x !== a) : [...f.aktivitas, a])
  const mood = moods.find((m) => m.id === f.mood)

  return (
    <main className="page">
      <div className="shell">
        <form className="form" onSubmit={(e) => { e.preventDefault(); setSaved(true) }}>
          <header>
            <h1>Catatan hari ini</h1>
            <p>Isi singkat saja. Tidak ada jawaban yang benar atau salah.</p>
          </header>

          <label className="field">
            <span>Nama panggilan</span>
            <input value={f.nama} onChange={(e) => set('nama', e.target.value)} placeholder="Contoh: Rodo" />
          </label>

          <fieldset>
            <legend>Suasana hati</legend>
            <div className="moods">
              {moods.map((m) => (
                <button type="button" key={m.id} className={f.mood === m.id ? 'mood on' : 'mood'} onClick={() => set('mood', m.id)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="9" cy="10" r=".6" fill="currentColor" />
                    <circle cx="15" cy="10" r=".6" fill="currentColor" />
                    <path d={m.m} />
                  </svg>
                  {m.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="row">
            <div className="field">
              <span>Jam tidur semalam</span>
              <div className="stepper">
                <button type="button" onClick={() => set('tidur', Math.max(0, f.tidur - 1))} aria-label="Kurangi">-</button>
                <b>{f.tidur} jam</b>
                <button type="button" onClick={() => set('tidur', Math.min(12, f.tidur + 1))} aria-label="Tambah">+</button>
              </div>
            </div>
            <label className="field">
              <span>Tingkat energi: {f.energi} dari 10</span>
              <input type="range" min="1" max="10" value={f.energi} onChange={(e) => set('energi', +e.target.value)} />
            </label>
          </div>

          <fieldset>
            <legend>Yang kamu lakukan hari ini</legend>
            <div className="chips">
              {acts.map((a) => (
                <button type="button" key={a} className={f.aktivitas.includes(a) ? 'chip on' : 'chip'} onClick={() => toggle(a)}>{a}</button>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Catatan kecil <em>{f.catatan.length}/140</em></span>
            <textarea rows="3" maxLength="140" value={f.catatan} onChange={(e) => set('catatan', e.target.value)} placeholder="Satu hal yang ingin kamu ingat dari hari ini" />
          </label>

          <button type="submit" className="submit"><span>{saved ? 'Tersimpan' : 'Simpan catatan'}</span></button>
        </form>

        <aside className="note">
          <div className="note-top">
            <span>{tanggal}</span>
            <span className={saved ? 'stamp on' : 'stamp'}>Tersimpan</span>
          </div>
          <h2>{greet}{f.nama && `, ${f.nama}`}</h2>
          <dl>
            <div><dt>Suasana hati</dt><dd>{mood ? mood.label : 'Belum dipilih'}</dd></div>
            <div><dt>Jam tidur</dt><dd>{f.tidur} jam</dd></div>
            <div><dt>Energi</dt><dd><span className="bar"><i style={{ width: `${f.energi * 10}%` }} /></span></dd></div>
            <div><dt>Aktivitas</dt><dd>{f.aktivitas.length ? f.aktivitas.join(', ') : 'Belum dipilih'}</dd></div>
          </dl>
          <p className="quote">{f.catatan || 'Catatanmu akan muncul di sini.'}</p>
        </aside>
      </div>
    </main>
  )
}
