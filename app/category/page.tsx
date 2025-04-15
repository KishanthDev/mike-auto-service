import React from "react";

import SidebarLayout from "../subcategory/layout";

import Categories from "@/components/CategoryPage";

const page = () => {
  return (
    <div>
      <SidebarLayout>
        <Categories />
      </SidebarLayout>
    </div>
  );
};

export default page;
