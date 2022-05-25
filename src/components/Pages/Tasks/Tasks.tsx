import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Category, Task as TaskType } from 'types/task';
import { maxNumber, clearOffExceptNumbers } from 'utils/helper';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, sendChanges, TasksState } from 'reducers/tasksSlice';
//Components
import Loading from 'components/Loading';
import TasksContent from 'components/Tasks';
import { Columns } from 'components/Tasks/type';

const Tasks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories, tasks, tags, loading } = useSelector<
    RootState,
    TasksState
  >(({ tasks }) => tasks);

  useEffect(() => {
    //get id tasks from url and send request
    const boardID = clearOffExceptNumbers(location.search);
    dispatch(getTasks(boardID));
  }, []);

  //convert data array to data object
  const setData = (): Columns => {
    const columns = categories.reduce((target, { id, name, order }) => {
      const newTasks = tasks.filter(({ category_id }) => category_id === id);
      const value = {
        name,
        categories_id: id,
        tasks: newTasks,
      };
      return { ...target, [order]: value };
    }, {});
    return columns;
  };

  const sendCategories = (categories: Category[]) => {
    dispatch(sendChanges({ categories }));
  };

  const sendTasks = (data: TaskType[]) => {
    dispatch(sendChanges({ data }));
  };

  const sendTags = (tags: string[]) => {
    dispatch(sendChanges({ tags }));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <TasksContent
      tags={tags}
      data={setData()}
      sendTags={sendTags}
      sendTasks={sendTasks}
      sendCategories={sendCategories}
      newIDForTask={maxNumber(tasks.map((task) => task.id))}
      newIDForColumn={maxNumber(categories.map((cat) => cat.id))}
    />
  );
};

export default Tasks;
