import { useMemo, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

type ArchiveForm = { title: string; city: string; country: string; latitude: string; longitude: string; note: string; imageUrl: string; status: "draft" | "published" };
const blankForm: ArchiveForm = { title: "", city: "", country: "", latitude: "", longitude: "", note: "", imageUrl: "", status: "draft" };

/** fourtee2travel internal content console: authenticated admin-only CMS for destination notes. */
export default function ArchiveCommand() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const [form, setForm] = useState<ArchiveForm>(blankForm);
  const [editId, setEditId] = useState<number | null>(null);
  const archive = trpc.archive.adminList.useQuery(undefined, { enabled: user?.role === "admin" });
  const refresh = () => void utils.archive.adminList.invalidate();
  const create = trpc.archive.create.useMutation({ onSuccess: () => { refresh(); setForm(blankForm); } });
  const update = trpc.archive.update.useMutation({ onSuccess: () => { refresh(); setForm(blankForm); setEditId(null); } });
  const remove = trpc.archive.remove.useMutation({ onSuccess: refresh });
  const isBusy = create.isPending || update.isPending || remove.isPending;
  const recordCount = useMemo(() => archive.data?.length ?? 0, [archive.data]);

  if (loading) return <div className="platform-loading">OPENING ARCHIVE COMMAND</div>;
  if (!user) return <main className="command-gate"><p className="section-label">ARCHIVE COMMAND / AUTH REQUIRED</p><h1>Authorize the<br />field archive.</h1><button className="platform-action" onClick={() => startLogin()}>SIGN IN <b>↗</b></button></main>;
  if (user.role !== "admin") return <main className="command-gate"><p className="section-label">ARCHIVE COMMAND / ACCESS LIMITED</p><h1>Observer access<br />only.</h1><a className="platform-action" href="/archive">VIEW PUBLISHED ARCHIVE <b>↗</b></a></main>;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { ...form, imageUrl: form.imageUrl || undefined };
    if (editId) update.mutate({ id: editId, data }); else create.mutate(data);
  };
  const beginEdit = (note: NonNullable<typeof archive.data>[number]) => {
    setEditId(note.id);
    setForm({ title: note.title, city: note.city, country: note.country, latitude: note.latitude, longitude: note.longitude, note: note.note, imageUrl: note.imageUrl || "", status: note.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <DashboardLayout><div className="archive-command">
    <header><p className="section-label">fourtee2travel / DESTINATION MANAGER</p><h1>Manage<br /><span>destination notes.</span></h1><p>Create a note, add its coordinates, then choose <strong>Published</strong> to show it in the public destination archive. {recordCount} FIELD NOTE{recordCount === 1 ? "" : "S"} IN MEMORY.</p></header>
    <form onSubmit={submit} className="archive-form">
      <div className="archive-form__heading"><p>{editId ? "EDIT DESTINATION NOTE" : "ADD DESTINATION NOTE"}</p>{editId && <button type="button" onClick={() => { setEditId(null); setForm(blankForm); }}>CANCEL EDIT</button>}</div>
      <label>NOTE TITLE<input required value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="The first light" /></label>
      <label>CITY<input required value={form.city} onChange={event => setForm({ ...form, city: event.target.value })} placeholder="Perth" /></label>
      <label>COUNTRY<input required value={form.country} onChange={event => setForm({ ...form, country: event.target.value })} placeholder="Australia" /></label>
      <label>LATITUDE<input required value={form.latitude} onChange={event => setForm({ ...form, latitude: event.target.value })} placeholder="-31.9535" /></label>
      <label>LONGITUDE<input required value={form.longitude} onChange={event => setForm({ ...form, longitude: event.target.value })} placeholder="115.8570" /></label>
      <label>IMAGE URL <input type="url" value={form.imageUrl} onChange={event => setForm({ ...form, imageUrl: event.target.value })} placeholder="Optional project asset URL" /></label>
      <label className="archive-form__wide">FIELD NOTE<textarea required value={form.note} onChange={event => setForm({ ...form, note: event.target.value })} placeholder="Write the observation that makes this coordinate worth keeping." /></label>
      <label>VISIBILITY<select value={form.status} onChange={event => setForm({ ...form, status: event.target.value as ArchiveForm["status"] })}><option value="draft">Draft — only visible here</option><option value="published">Published — visible to visitors</option></select></label>
      <button className="platform-action" disabled={isBusy} type="submit">{editId ? "SAVE CHANGES" : form.status === "published" ? "PUBLISH DESTINATION NOTE" : "SAVE DRAFT"} <b>↗</b></button>
    </form>
    <section className="archive-command__records"><div className="archive-command__title"><p>ARCHIVE INDEX</p><a href="/archive">VIEW PUBLIC ARCHIVE <b>↗</b></a></div>{archive.data?.map(note => <article key={note.id}><span>{note.status.toUpperCase()}</span><div><strong>{note.title}</strong><p>{note.city} / {note.country} — {note.latitude}° / {note.longitude}°</p></div><button type="button" onClick={() => beginEdit(note)}>EDIT</button><button type="button" onClick={() => remove.mutate({ id: note.id })}>REMOVE</button></article>)}</section>
  </div></DashboardLayout>;
}
