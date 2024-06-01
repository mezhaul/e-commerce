const Clothes = () => {

    return (
        <div class="w-full md:w-11/12 m-auto px-2 md:px-0 pt-16 lg:pt-20 flex flex-wrap py-10 mb:pb-10">
            <div class="flex w-full gap-3">
                <a href="/ladies" class="w-full md:w-1/2 bg-gray-300 h-96"> ladies</a>
                <a href="/men" class="w-full md:w-1/2 bg-gray-300 h-96"></a>
            </div>
            <div class="flex w-full gap-3 mt-3">
                <a href="/kids" class="w-full md:w-1/2 bg-gray-300 h-96"></a>
                <a  href="/toddlers" class="w-full md:w-1/2 bg-gray-300 h-96"></a>
            </div>
        </div>
    );
};

export default Clothes;