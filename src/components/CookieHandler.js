import Cookies from "js-cookie";

export function cookieHandler(element) {
    let labelList = Cookies.get("labelList") ? JSON.parse(Cookies.get("labelList")) : [];

    if (labelList.length > 0) {
        element.labels?.forEach((label) => {
            let checkedLabel = labelList.find((e) => e.value == label.value);
            if (checkedLabel) {
                checkedLabel.count += 1;
            } else {
                labelList.push({ value: label.value, count: 1 });
            }
        });
    } else {
        element.labels?.forEach((label) => {
            labelList.push({ value: label.value, count: 1 });
        });
    }

    Cookies.set("labelList", JSON.stringify(labelList));
    console.log(JSON.parse(Cookies.get("labelList")));
}
