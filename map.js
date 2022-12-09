ymaps.ready(function () {

    var LAYER_NAME = 'user#layer',
        MAP_TYPE_NAME = 'user#customMap',
    // Директория с тайлами.
        TILES_PATH = 'images/tiles',
    /* Для того чтобы вычислить координаты левого нижнего и правого верхнего углов прямоугольной координатной
     * области, нам необходимо знать максимальный зум, ширину и высоту изображения в пикселях на максимальном зуме.
     */
        MAX_ZOOM = 4,
        PIC_WIDTH = 2526,
        PIC_HEIGHT = 1642;

    /**
     * Конструктор, создающий собственный слой.
     */
    var Layer = function () {
        var layer = new ymaps.Layer(TILES_PATH + '/%z/tile-%x-%y.png', {
            // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
            // раскомментируйте эту строчку и укажите ссылку на изображение.
            notFoundTile: 'images/nomap.jpg'
        });
        // Указываем доступный диапазон масштабов для данного слоя.
        layer.getZoomRange = function () {
            return ymaps.vow.resolve([0, 4]);
        };
        // Добавляем свои копирайты.
        layer.getCopyrights = function () {
            return ymaps.vow.resolve('©');
        };
        return layer;
    };
    // Добавляем в хранилище слоев свой конструктор.
    ymaps.layer.storage.add(LAYER_NAME, Layer);

    /**
     * Создадим новый тип карты.
     * MAP_TYPE_NAME - имя нового типа.
     * LAYER_NAME - ключ в хранилище слоев или функция конструктор.
     */
    var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
    // Сохраняем тип в хранилище типов.
    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

    // Вычисляем размер всех тайлов на максимальном зуме.
    var worldSize = Math.pow(2, MAX_ZOOM) * 256,
        /**
         * Создаем карту, указав свой новый тип карты.
         */
        map = new ymaps.Map('map', {
            center: [200, 100],
            zoom: 1,
            controls: ['zoomControl'],
            type: MAP_TYPE_NAME
        }, {

            // Задаем в качестве проекции Декартову. При данном расчёте центр изображения будет лежать в координатах [0, 0].
            projection: new ymaps.projection.Cartesian([[PIC_HEIGHT / 2 - worldSize, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, worldSize - PIC_WIDTH / 2]], [false, false]),
            // Устанавливаем область просмотра карты так, чтобы пользователь не смог выйти за пределы изображения.
            restrictMapArea: [[-PIC_HEIGHT / 2, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, PIC_WIDTH / 2]]

            // При данном расчёте, в координатах [0, 0] будет находиться левый нижний угол изображения,
            // правый верхний будет находиться в координатах [PIC_HEIGHT, PIC_WIDTH].
            // projection: new ymaps.projection.Cartesian([[PIC_HEIGHT - worldSize, 0], [PIC_HEIGHT, worldSize]], [false, false]),
            // restrictMapArea: [[0, 0], [PIC_HEIGHT, PIC_WIDTH]]
        });

    // Ставим метку в центр координат. Обратите внимание, координаты метки задаются в порядке [y, x].
    var point = new ymaps.Placemark([170, 260], {
        balloonContent: 'Месопотамия'
    }, {
        preset: 'islands#blueCircleDotIcon'
    });
    var point2 = new ymaps.Placemark([235, 70], {
        balloonContent: 'Древняя Греция'
    }, {
        preset: 'islands#redCircleDotIcon'
    });
    var point3 = new ymaps.Placemark([257, 6], {
        balloonContent: 'Древний Рим'
    }, {
        preset: 'islands#darkOrangeCircleDotIcon'
    });
    var point4 = new ymaps.Placemark([153, 125], {
        balloonContent: 'Древний Египет'
    }, {
        preset: 'islands#nightCircleDotIcon'
    });
    var point5 = new ymaps.Placemark([400, 125], {
        balloonContent: 'Древняя Русь'
    }, {
        preset: 'islands#darkGreenCircleDotIcon'
    });
    var point6 = new ymaps.Placemark([260, 705], {
        balloonContent: 'Китай'
    }, {
        preset: 'islands#orangeCircleDotIcon'
    });
    var point7 = new ymaps.Placemark([290, 955], {
        balloonContent: 'Япония'
    }, {
        preset: 'islands#violetCircleDotIcon'
    });
    var point8 = new ymaps.Placemark([290, 850], {
        balloonContent: 'Корея'
    }, {
        preset: 'islands#blackCircleDotIcon'
    });
    var point9 = new ymaps.Placemark([340, 0], {
        balloonContent: 'Европа'
    }, {
        preset: 'islands#oliveCircleDotIcon'
    });


    map.geoObjects.add(point);
    map.geoObjects.add(point2);
    map.geoObjects.add(point3);
    map.geoObjects.add(point4);
    map.geoObjects.add(point5);
    map.geoObjects.add(point6);
    map.geoObjects.add(point7);
    map.geoObjects.add(point8);
    map.geoObjects.add(point9);
});
