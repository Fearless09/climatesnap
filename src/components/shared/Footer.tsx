const Footer = () => {
  return (
    <footer className="mt-8 border-t border-zinc-100 bg-zinc-50 px-4 py-5 text-center text-xs font-semibold text-zinc-500 dark:border-zinc-900 dark:bg-black">
      <p>© {new Date().getFullYear()} ClimateSnap.</p>
    </footer>
  );
};

export default Footer;
