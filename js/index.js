const loadPhTube = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const phTubes = data.data;
    const categoryBtn = document.getElementById('category-btn');
    phTubes.forEach(phTube => {
        const btn = document.createElement('div');
        btn.innerHTML = `
        <button class="btn focus:bg-[#FF1F3D] w-full" onclick="category('${phTube.category_id}')">${phTube.category}</button>
        `;
        categoryBtn.appendChild(btn);
    });
}

const category = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    let categoriesData = data.data;
    console.log(categoriesData);

    


    const tubeContainer = document.getElementById('ph-tube-container');
    tubeContainer.textContent = '';


    const err = document.getElementById('no-data');
    if (categoriesData.length === 0) {
        err.classList.remove('hidden');
    } else {
        err.classList.add('hidden');
    }

    

    categoriesData.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.replace('K', '')) || 0;
        const viewsB = parseFloat(b.others.views.replace('K', '')) || 0;
        return viewsB - viewsA;
    })


    categoriesData.forEach(categoryData => {
        const tubeContainerCard = document.createElement('div');
        tubeContainerCard.innerHTML = `
        <div class="card h-80 bg-base-100 shadow-xl">
                <figure class="h-40 relative"><img src="${categoryData.thumbnail}" alt="ph-tube"/> <span class="absolute right-2 bottom-2 text-white bg-gray-800 rounded-lg px-2">${categoryData.others.posted_date ? `${parseInt((categoryData.others.posted_date) / 3600)}hrs ${Math.floor(((categoryData.others?.posted_date) % 3600) / 60)} min ago` : ''}</span></figure>
                <div class="card-body">
                  <div class="flex justify-start gap-5">
                    <div>
                        <img src="${categoryData.authors[0].profile_picture}" alt="" class="rounded-full w-16 h-16">
                    </div>
                    <div> 
                        <h2 class="card-title">${categoryData.title}</h2>
                        <p>${categoryData.authors[0].profile_name} <span>${categoryData.authors[0].verified ? '<i class="fa-solid fa-certificate" style="color: #005cfa;"></i>' : ''}</span></p>
                        <p>${categoryData.others.views}</p>
                    </div>
                  </div>
                </div>
        </div>
        `;
        tubeContainer.appendChild(tubeContainerCard);
    })

}


loadPhTube();
category('1000');



const blog = () => {
    window.location.href = 'blog.html';
}
