import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getTasks, sendChanges, TasksState } from 'reducers/tasksSlice';
import { maxNumber } from 'utils/helper';
import TasksContent from 'components/Tasks';
import { Columns } from 'components/Tasks/type';
import Loading from 'components/Loading';
import { Category, Task as TaskType } from 'types/task';

const Tasks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories, tasks, tags, loading } = useSelector<
    RootState,
    TasksState
  >(({ tasks }) => tasks);

  useEffect(() => {
    const taskID = Number(location.search.replace(/[^0-9]/g, ''));
    dispatch(getTasks(taskID));
  }, []);
  const setData = (): Columns => {
    const columns = categories.reduce((target, { id, name, order }) => {
      const value = {
        name,
        categories_id: id,
        tasks: tasks.filter(({ category_id }) => category_id === id),
      };
      return { ...target, [order]: value };
    }, {});
    return columns;
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <TasksContent
      data={setData()}
      tags={tags}
      newIDForTask={maxNumber(tasks.map((task) => task.id))}
      newIDForColumn={maxNumber(categories.map((cat) => cat.id))}
      sendCategories={(categories: Category[]) => {
        dispatch(sendChanges({ categories }));
      }}
      sendTasks={(data: TaskType[]) => {
        dispatch(sendChanges({ data }));
      }}
      sendTags={(tags: string[]) => {
        dispatch(sendChanges({ tags }));
      }}
    />
  );
};

export default Tasks;
