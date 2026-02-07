import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import { useAuth } from '../../../store/AuthContext';
import { useToast } from '../../../store/ToastContext';
import { sanitizeString } from '../../../shared/utils/sanitize';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const AddressesTab = () => {
    const { user } = useAuth();
    const toast = useToast();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        label: '', first_name: '', last_name: '', email: '', address: '', city: '', state: '', zip: '', is_default: false
    });

    useEffect(() => {
        if (user) fetchAddresses();
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const { data, error } = await supabase
                .from('addresses')
                .select('*')
                .eq('user_id', user.id)
                .order('is_default', { ascending: false });

            if (error) throw error;
            setAddresses(data || []);
        } catch (err) {
            toast.error('Failed to load addresses.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ label: '', first_name: '', last_name: '', email: user?.email || '', address: '', city: '', state: '', zip: '', is_default: false });
        setEditing(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const payload = {
            user_id: user.id,
            label: sanitizeString(form.label, 50),
            first_name: sanitizeString(form.first_name),
            last_name: sanitizeString(form.last_name),
            email: sanitizeString(form.email),
            address: sanitizeString(form.address),
            city: sanitizeString(form.city),
            state: sanitizeString(form.state),
            zip: sanitizeString(form.zip, 20),
            is_default: !!form.is_default,
        };

        try {
            if (editing) {
                const { error } = await supabase.from('addresses').update(payload).eq('id', editing.id).eq('user_id', user.id);
                if (error) throw error;
                toast.success('Address updated.');
            } else {
                const { error } = await supabase.from('addresses').insert([payload]);
                if (error) throw error;
                toast.success('Address added.');
            }
            resetForm();
            fetchAddresses();
        } catch (err) {
            toast.error(err.message || 'Failed to save address.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this address?')) return;
        try {
            const { error } = await supabase.from('addresses').delete().eq('id', id).eq('user_id', user.id);
            if (error) throw error;
            toast.success('Address deleted.');
            fetchAddresses();
        } catch (err) {
            toast.error('Failed to delete.');
        }
    };

    const handleEdit = (a) => {
        setEditing(a);
        setForm({
            label: a.label || '',
            first_name: a.first_name || '',
            last_name: a.last_name || '',
            email: a.email || '',
            address: a.address || '',
            city: a.city || '',
            state: a.state || '',
            zip: a.zip || '',
            is_default: !!a.is_default,
        });
    };

    if (loading) return <div className="py-12 text-center text-gray-500">Loading...</div>;

    return (
        <div className="space-y-8">
            <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Plus size={20} /> {editing ? 'Edit Address' : 'Add New Address'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="label" placeholder="Label (e.g. Home)" value={form.label} onChange={(e) => setForm(f => ({ ...f, label: e.target.value }))}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input type="checkbox" checked={form.is_default} onChange={(e) => setForm(f => ({ ...f, is_default: e.target.checked }))} />
                        Default address
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="first_name" placeholder="First Name" required value={form.first_name} onChange={(e) => setForm(f => ({ ...f, first_name: e.target.value }))}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                    <input name="last_name" placeholder="Last Name" required value={form.last_name} onChange={(e) => setForm(f => ({ ...f, last_name: e.target.value }))}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                </div>
                <input name="email" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                <input name="address" placeholder="Street Address" required value={form.address} onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input name="city" placeholder="City" required value={form.city} onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                    <input name="state" placeholder="State" required value={form.state} onChange={(e) => setForm(f => ({ ...f, state: e.target.value }))}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                    <input name="zip" placeholder="Postal Code" required value={form.zip} onChange={(e) => setForm(f => ({ ...f, zip: e.target.value }))}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                </div>
                <div className="flex gap-3">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm">Save</button>
                    {editing && <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white text-sm">Cancel</button>}
                </div>
            </form>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><MapPin size={20} /> Saved Addresses</h3>
                {addresses.length === 0 ? (
                    <p className="text-gray-500 text-sm">No addresses yet. Add one above.</p>
                ) : (
                    <div className="space-y-3">
                        {addresses.map((a) => (
                            <div key={a.id} className="glass-panel p-4 rounded-xl border border-white/5 flex justify-between items-start">
                                <div>
                                    <span className="text-white font-bold">{a.first_name} {a.last_name}</span>
                                    {a.label && <span className="text-gray-500 text-sm ml-2">({a.label})</span>}
                                    {a.is_default && <span className="ml-2 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">Default</span>}
                                    <p className="text-gray-400 text-sm mt-1">{a.address}, {a.city}, {a.state} {a.zip}</p>
                                    <p className="text-gray-500 text-xs">{a.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(a)} className="text-gray-400 hover:text-white p-1"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressesTab;
