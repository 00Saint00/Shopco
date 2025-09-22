import { Tab } from "@headlessui/react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  return (
    <div className="px-[16px] lg:px-[100px] pt-[80px] pb-[168px]">
      <h1 className="text-2xl font-bold mb-6">Authentication</h1>

      <div className="w-full max-w-md mx-auto">
        <Tab.Group>
          <Tab.List className="flex border-b border-gray-300">
            <Tab className="flex-1 px-4 py-2 text-center font-medium ui-selected:border-b-2 ui-selected:border-black ui-selected:text-black">
              Login
            </Tab>
            <Tab className="flex-1 px-4 py-2 text-center font-medium ui-selected:border-b-2 ui-selected:border-black ui-selected:text-black">
              Register
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-6">
            {/* Login Form */}
            <Tab.Panel>
              <Login />
            </Tab.Panel>

            {/* Register Form */}
            <Tab.Panel>
              <Register />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AuthPage;
