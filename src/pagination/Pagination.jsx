import React, {useState} from "react";

export default function Pagination({data, RenderComponent, pageLimit, dataLimit}) {
const [pages] = useState(Math.round(data.length/dataLimit));
const [currentPage, setCurrenPage] = useState(1);

function goToNextPage() {

}

function goToPreviousPage() {

}

function changePage(event) {

}

const getPaginationData = () => {

}

const getPaginationGrouup = () => {

}

return (
    <div className="pagination">
        
    </div>
)

}