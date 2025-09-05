import { Quest } from '../../entities/quest/model';
import { supabase } from '../../shared/lib/supabase/supabase';

export const clearQuest = async (quest: Quest) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString().substring(0, 10);

  const { error } = await supabase.from('histories').insert({
    title: quest.title,
    date: today,
    type: quest.type,
    completed: true,
  });

  if (error) {
    console.error(error);
    return false;
  }

  const { error: deleteError } = await supabase
    .from('quests')
    .delete()
    .eq('id', quest.id);

  if (deleteError) {
    console.error(deleteError);
    return false;
  }

  return true;
};

export const deleteQuest = async (quest: Quest) => {
  try {
    const { error } = await supabase.from('quests').delete().eq('id', quest.id);

    if (error) {
      console.error('퀘스트 삭제 실패:', error.message);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error('퀘스트 삭제 실패:', error.message);
    return false;
  }
};

export const getQuests = async (): Promise<Quest[]> => {
  try {
    const { data, error } = await supabase.from('quests').select();

    if (error) {
      console.error('퀘스트 조회 실패:', error.message);
      return [];
    }

    return data || [];
  } catch (error: any) {
    console.error('퀘스트 조회 실패:', error.message);
    return [];
  }
};
