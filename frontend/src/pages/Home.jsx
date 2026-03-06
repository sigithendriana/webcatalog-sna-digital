import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { smoothScrollTo } from "../utils/smoothScroll";
import { getTemplates } from "../services/api";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // State untuk kontrol suara

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Fungsi agar Mute tidak bikin Iframe Refresh
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    const iframe = document.getElementById("preview-invitation");
    if (iframe) {
      iframe.contentWindow.postMessage(
        { type: "SET_MUTE", value: newMutedState },
        "*",
      );
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ================= HOME / HERO SECTION ================== */}
      <section
        id="home"
        className="relative w-full min-h-[90vh] md:min-h-screen flex items-center md:items-start pt-10 md:pt-16 pb-20 bg-gradient-to-br from-brand-soft via-brand-accent/40 to-white"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 md:w-[500px] md:h-[500px] bg-brand-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 md:w-[500px] md:h-[500px] bg-brand-secondary/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* === PERUBAHAN 1: tambah mx-4 untuk centering card di mobile === */}
            <div className="animate-fade-up text-center md:text-left bg-white/85 backdrop-blur rounded-2xl shadow-xl p-5 mx-4 md:mx-0 md:bg-transparent md:shadow-none md:rounded-none md:p-0 md:-mt-6 font-poppins">
              {/* === PERUBAHAN 2: hapus <br /> agar judul wrap alami di mobile === */}
              <h1 className="text-[22px] sm:text-3xl md:text-5xl font-bold leading-snug mb-3 md:mb-4">
                Undangan Pernikahan Digital{" "}
                <span className="text-brand-primary hidden md:inline">
                  <br />
                </span>
                <span className="text-brand-primary">
                  Praktis & Siap Dibagikan
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 md:mb-6 max-w-sm md:max-w-xl mx-auto md:mx-0 leading-relaxed">
                SNA Digital menyediakan undangan pernikahan digital dengan
                desain profesional, responsif, dan mudah dibagikan melalui
                WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
                <button
                  onClick={() => smoothScrollTo("katalog")}
                  className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Liat Katalog
                </button>
                <a
                  href={`https://wa.me/628138201614?text=${encodeURIComponent(
                    "Halo SNA Digital, saya ingin konsultasi mengenai undangan digital !!!",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-brand-primary text-brand-primary px-6 py-3 rounded-xl text-center hover:bg-sky-50 transition"
                >
                  Konsultasi via WhatsApp
                </a>
              </div>
              {/* === PERUBAHAN 3: tambah text-left agar teks checkmark rata kiri di mobile === */}
              <div className="text-sm text-gray-600 space-y-1 max-w-sm mx-auto md:mx-0 text-left">
                <p className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">✔</span>
                  <span>Aktif cepat dan mudah digunakan</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">✔</span>
                  <span>Bisa dibagikan ke WhatsApp & media sosial</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">✔</span>
                  <span>Desain rapi, modern, dan responsif</span>
                </p>
              </div>

              {/* SOCIAL CONTACTS */}
              <div className="mt-4 md:mt-6 flex flex-row gap-4 justify-center md:justify-start items-center text-[11px] sm:text-sm text-gray-600">
                <a
                  href="https://instagram.com/sna_digital.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 whitespace-nowrap hover:text-brand-primary transition"
                >
                  <FaInstagram /> @sna_digital.id
                </a>
                <a
                  href="mailto:snadigital111@gmail.com"
                  className="flex items-center gap-1.5 whitespace-nowrap hover:text-brand-primary transition"
                >
                  <MdEmail /> snadigital111@gmail.com
                </a>
              </div>
            </div>

            {/* MOCKUP HP */}
            <div className="hidden md:flex justify-center animate-fade-right">
              <div className="relative w-[340px] h-[680px] rounded-[3.5rem] bg-gray-900 p-[12px] shadow-2xl border-[4px] border-gray-800">
                {/* Tombol Mute */}
                <button
                  onClick={toggleMute}
                  className="absolute top-8 right-8 z-50 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all border border-gray-200 text-lg"
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>

                <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden relative">
                  <iframe
                    id="preview-invitation"
                    src="/tamplate-undangan/index3.html"
                    className="w-full h-full border-none"
                    title="preview"
                    allow="autoplay"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KATALOG SECTION ================= */}
      <section id="katalog" className="scroll-mt-32 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-3xl font-bold mb-4 font-poppins">
            Katalog Undangan
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl font-poppins">
            Pilih template undangan digital yang sesuai dengan konsep pernikahan
            Anda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="relative w-full bg-gray-100 overflow-hidden">
                  {item.thumbnail_url?.toLowerCase().endsWith(".mp4") ? (
                    <video
                      src={item.thumbnail_url}
                      className="w-full h-auto block"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={
                        item.thumbnail_url ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={item.name}
                      className="w-full h-auto block"
                    />
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg font-poppins">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-poppins mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-brand-primary text-lg">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/template/${item.slug}`}
                        className="px-4 py-2 text-sm border border-brand-primary text-brand-primary rounded-lg hover:bg-blue-50 transition font-poppins"
                      >
                        Preview
                      </Link>
                      <a
                        href={`https://wa.me/628138201614?text=${encodeURIComponent(
                          `Halo SNA Digital, saya ingin order template ${item.name}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
                      >
                        <FaShoppingCart />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KONTAK SECTION ================= */}
      <section id="kontak" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 font-poppins">
              Hubungi Kami
            </h2>
            <p className="text-gray-500 font-poppins">
              Punya pertanyaan atau butuh bantuan custom? Chat kami sekarang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* WHATSAPP */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all font-poppins">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                <FaWhatsapp size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">WhatsApp</h3>
                <p className="text-sm text-gray-500">SNA Digital</p>
                <a
                  href={`https://wa.me/628138201614?text=${encodeURIComponent(
                    "Halo SNA Digital, saya ingin bertanya ?",
                  )}`}
                  className="text-blue-500 text-sm font-semibold flex items-center gap-1 mt-1 hover:underline"
                >
                  Chat Sekarang <span>→</span>
                </a>
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all font-poppins">
              <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-500">
                <FaInstagram size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Instagram</h3>
                <p className="text-sm text-gray-500">@sna_digital.id</p>
                <a
                  href="https://instagram.com/sna_digital.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm font-semibold flex items-center gap-1 mt-1 hover:underline"
                >
                  Follow Instagram <span>→</span>
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all font-poppins">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Email</h3>
                <p className="text-sm text-gray-500">snadigital111@gmail.com</p>
                <a
                  href="mailto:snadigital111@gmail.com"
                  className="text-blue-500 text-sm font-semibold flex items-center gap-1 mt-1 hover:underline"
                >
                  Kirim Email <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
