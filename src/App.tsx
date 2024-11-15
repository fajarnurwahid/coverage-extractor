import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";

type CoverageType = {
    ranges: CoverageRangeType[];
    text: string;
    url: string;
    unusedRate?: number;
    usedCode?: string;
    unusedCode?: string;
};
type CoverageRangeType = {
    start: number;
    end: number;
};

function App() {
    const [data, setData] = useState<CoverageType[]>();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const result = e.target?.result;
                    if (typeof result === "string") {
                        const parsedData = formatData(JSON.parse(result));
                        setData(parsedData);
                    }
                } catch (err) {
                    alert("Error parsing JSON file");
                }
            };
            reader.onerror = () => {
                alert("Error reading file");
            };
            reader.readAsText(file);
        } else {
            alert("Please select a valid JSON file.");
        }
    }
    function onCopy(e: React.MouseEvent<HTMLButtonElement>, text?: string) {
        e.preventDefault();
        if (text) {
            const el = e.currentTarget;
            let cleanup: null | number = null;
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>`;
                    cleanup && clearTimeout(cleanup);
                    cleanup = setTimeout(() => {
                        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z"/></svg>`;
                    }, 1000);
                })
                .catch(() => {
                    alert("Failed to copy text: ");
                });
        }
    }

    return (
        <>
            <Navbar />
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <form className="mb-8">
                        <label htmlFor="coverage-file" className="text-base font-medium inline-block mb-2">
                            Upload coverage file
                        </label>
                        <input
                            type="file"
                            className="text-sm border border-neutral-300 p-3 rounded-lg w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            accept="application/json"
                            onChange={onChange}
                            id="coverage-file"
                        />
                    </form>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-neutral-200 min-w-96">
                            <thead className="bg-neutral-50">
                                <tr>
                                    <th className="font-semibold px-4 py-2 text-left text-sm border-b border-b-neutral-200" rowSpan={2}>
                                        File name
                                    </th>
                                    <th className="font-semibold px-4 py-2 text-right text-sm border-b border-b-neutral-200 w-0" rowSpan={2}>
                                        Rate
                                    </th>
                                    <th className="font-semibold px-4 py-2 text-center text-sm border border-neutral-200" colSpan={2}>
                                        Code
                                    </th>
                                </tr>
                                <tr>
                                    <th className="font-semibold px-4 py-2 text-center text-sm border border-neutral-200 w-24">Used</th>
                                    <th className="font-semibold px-4 py-2 text-center text-sm border border-neutral-200 w-24">Unused</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    data.map((item, i) => (
                                        <tr key={i} className="group/coverage-item">
                                            <td className="py-2 px-4 border-b border-b-neutral-200 group-hover/coverage-item:bg-neutral-100">
                                                <Link target="_blank" to={item.url} className="text-indigo-600 font-medium text-sm hover:underline">
                                                    {item.url}
                                                </Link>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-neutral-200 group-hover/coverage-item:bg-neutral-100 text-right text-sm text-neutral-600">
                                                {item.unusedRate?.toFixed(1)}%
                                            </td>
                                            <td className="py-2 px-4 border border-neutral-200 group-hover/coverage-item:bg-neutral-100 text-center text-sm text-neutral-600">
                                                {item.unusedRate !== 100 ? (
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center w-8 h-8 mx-auto rounded-full hover:bg-neutral-200"
                                                        onClick={(e) => onCopy(e, item.usedCode)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="16px"
                                                            viewBox="0 -960 960 960"
                                                            width="16px"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border border-neutral-200 group-hover/coverage-item:bg-neutral-100 text-center text-sm text-neutral-600">
                                                {item.unusedRate !== 100 ? (
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center w-8 h-8 mx-auto rounded-full hover:bg-neutral-200"
                                                        onClick={(e) => onCopy(e, item.unusedCode)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="16px"
                                                            viewBox="0 -960 960 960"
                                                            width="16px"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-neutral-200 text-center text-sm text-neutral-600" colSpan={5}>
                                            No Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}

function formatData(dataArray: CoverageType[]): CoverageType[] {
    return dataArray.map((data) => {
        return { ...data, unusedRate: getUnusedRate(data), usedCode: getUsedCode(data), unusedCode: getUnusedCode(data) };
    });
}
function getUnusedRate(data: CoverageType) {
    const totalBytes = data.text.length;
    const unusedBytes = data.ranges.reduce((unused, range) => {
        return unused + (range.end - range.start);
    }, 0);
    const unusedRate = 100 - (unusedBytes / totalBytes) * 100;
    return unusedRate;
}
function getUsedCode(data: CoverageType) {
    const usedCode: string[] = [];
    const { text, ranges } = data;
    if (!ranges || ranges.length === 0) {
        return;
    }
    ranges.forEach((range) => {
        usedCode.push(text.slice(range.start, range.end));
    });
    return usedCode.join("\n");
}
function getUnusedCode(data: CoverageType) {
    const unusedCode: string[] = [];
    const { text, ranges } = data;
    if (!ranges || ranges.length === 0) {
        return;
    }
    let lastIndex = 0;
    ranges.forEach((range) => {
        unusedCode.push(text.slice(lastIndex, range.start));
        lastIndex = range.end;
    });
    return unusedCode.join("\n");
}

export default App;
