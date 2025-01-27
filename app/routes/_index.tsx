import { useEdgeRuntime } from '@assistant-ui/react';

import { Thread } from '@assistant-ui/react';
import { ChatWindow } from '~/components/ChatWindow';
import { MyRuntimeProvider } from '~/components/RuntimeProvider';
import { TodoList } from '~/components/TodoList';

export default function Index() {
  return (
    <div className="h-full grid grid-cols-2 max-h-screen">
      <div className="col-span-1">
        <MyRuntimeProvider>
          <ChatWindow />
        </MyRuntimeProvider>
      </div>

      <div className="col-span-1 overflow-y-auto">
        <div className=" mx-auto p-12">
          <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
