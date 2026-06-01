// ======================================================
// KONEKSI SUPABASE - BELAJAR CERIA
// ======================================================

// 🔴 GANTI DENGAN PUNYA LO! 🔴
const SUPABASE_URL = "https://zyvnxpehxwymzwlpiizm.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_tQE1M86QbBdzYl36qqxh8g_v8jFRvV4";

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ======================================================
// FUNGSI MURID
// ======================================================

export async function getMurid() {
    let { data, error } = await supabase.from('murid').select('*');
    if (error) console.error('Error getMurid:', error);
    return data || [];
}

export async function getMuridByNama(nama) {
    let { data, error } = await supabase.from('murid').select('*').eq('nama', nama);
    if (error) console.error('Error getMuridByNama:', error);
    return data && data.length > 0 ? data[0] : null;
}

export async function tambahMurid(nama) {
    let { data, error } = await supabase.from('murid').insert([{ nama: nama }]).select();
    if (error) console.error('Error tambahMurid:', error);
    return data && data.length > 0 ? data[0] : null;
}

// ======================================================
// FUNGSI PROGRESS MENULIS
// ======================================================

export async function simpanMenulis(muridId, huruf) {
    let { error } = await supabase.from('progress_menulis').insert([{
        murid_id: muridId,
        huruf: huruf
    }]);
    if (error) console.error('Error simpanMenulis:', error);
    return !error;
}

export async function getHurufDikuasai(muridId) {
    let { data, error } = await supabase.from('progress_menulis')
        .select('huruf')
        .eq('murid_id', muridId);
    if (error) console.error('Error getHurufDikuasai:', error);
    
    let hurufSet = new Set();
    data?.forEach(item => hurufSet.add(item.huruf));
    return Array.from(hurufSet);
}

// ======================================================
// FUNGSI PROGRESS MEMBACA
// ======================================================

export async function simpanMembaca(muridId, kata) {
    let { error } = await supabase.from('progress_membaca').insert([{
        murid_id: muridId,
        kata: kata
    }]);
    if (error) console.error('Error simpanMembaca:', error);
    return !error;
}

export async function getTotalMembaca(muridId) {
    let { count, error } = await supabase.from('progress_membaca')
        .select('*', { count: 'exact', head: true })
        .eq('murid_id', muridId);
    if (error) console.error('Error getTotalMembaca:', error);
    return count || 0;
}

// ======================================================
// FUNGSI PROGRESS BERHITUNG
// ======================================================

export async function simpanBerhitung(muridId, skor, totalSoal, tipeKuis) {
    let { error } = await supabase.from('progress_berhitung').insert([{
        murid_id: muridId,
        skor: skor,
        total_soal: totalSoal,
        tipe_kuis: tipeKuis
    }]);
    if (error) console.error('Error simpanBerhitung:', error);
    return !error;
}

export async function getTotalBerhitung(muridId) {
    let { count, error } = await supabase.from('progress_berhitung')
        .select('*', { count: 'exact', head: true })
        .eq('murid_id', muridId);
    if (error) console.error('Error getTotalBerhitung:', error);
    return count || 0;
}

// ======================================================
// FUNGSI LENCANA
// ======================================================

export async function simpanLencana(muridId, lencanaId, lencanaNama, lencanaIcon) {
    let { error } = await supabase.from('lencana_murid').insert([{
        murid_id: muridId,
        lencana_id: lencanaId,
        lencana_nama: lencanaNama,
        lencana_icon: lencanaIcon
    }]);
    if (error) console.error('Error simpanLencana:', error);
    return !error;
}

export async function getLencanaMurid(muridId) {
    let { data, error } = await supabase.from('lencana_murid')
        .select('*')
        .eq('murid_id', muridId);
    if (error) console.error('Error getLencanaMurid:', error);
    return data || [];
}

export async function cekLencana(muridId, lencanaId) {
    let lencana = await getLencanaMurid(muridId);
    return lencana.some(l => l.lencana_id === lencanaId);
}
