const loadPhTube = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const phTubes = data.data;

    const categoryBtn = document.getElementById('category-btn');
    phTubes.forEach(phTube => {
        const btn = document.createElement('div');
        btn.innerHTML = `
        <button class="btn active:bg-[#FF1F3D] w-full" onclick="category('${phTube.category_id}')">${phTube.category}</button>
        `;
        categoryBtn.appendChild(btn);
    }); 
}

const category = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const categoriesData = data.data
    console.log(categoriesData);

    const tubeContainer = document.getElementById('ph-tube-container');
    tubeContainer.textContent = '';
    categoriesData.forEach(categoryData => {
        const tubeContainerCard = document.createElement('div');
        tubeContainerCard.innerHTML = `
        <div class="card h-80 bg-base-100 shadow-xl">
                <figure class="h-40"><img src="${categoryData.thumbnail}" alt="ph-tube"/></figure>
                <div class="card-body">
                  <div class="flex justify-start gap-5">
                    <div>
                        <img src="${categoryData.authors[0].profile_picture}" alt="" class="rounded-full w-16 h-16">
                    </div>
                    <div> 
                        <h2 class="card-title">${categoryData.title}</h2>
                        <p>${categoryData.authors[0].profile_name}</p>
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

