self.onmessage = async (e: MessageEvent) => {
  const url = String(e.data);
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();
    postMessage({ ok: true, data });
  } catch (error) {
    postMessage({ ok: false, error: String(error) });
  }
};
