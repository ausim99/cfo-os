/* ECharts-compatibility shim backed by Chart.js v4 (artifact sandbox allows Chart.js only) */
(function(){
"use strict";
function F(v,d){ try{ if(typeof window.fmt==="function") return window.fmt(v,d===undefined?(Math.abs(v)<10?1:0):d);}catch(e){}
  return (Math.round(v*10)/10).toLocaleString(); }
function rgba(c,a){ if(!c) return c;
  if(c[0]==="#"){ let x=c.slice(1); if(x.length===3)x=x.split("").map(ch=>ch+ch).join("");
    const n=parseInt(x,16); return "rgba("+(n>>16&255)+","+(n>>8&255)+","+(n&255)+","+a+")"; }
  return c; }
function cssv(n,f){ const v=getComputedStyle(document.documentElement).getPropertyValue(n).trim(); return v||f; }
const refLinePlugin={id:"echRef",afterDatasetsDraw(ch){
  const refs=ch.options._refs; if(!refs||!refs.length) return;
  const {ctx,chartArea,scales}=ch; if(!scales.y) return;
  refs.forEach(r=>{ const y=scales.y.getPixelForValue(r.v); if(y<chartArea.top||y>chartArea.bottom)return;
    ctx.save(); ctx.strokeStyle=r.color||"#c23a3a"; ctx.setLineDash([5,4]); ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(chartArea.left,y); ctx.lineTo(chartArea.right,y); ctx.stroke();
    if(r.label){ ctx.fillStyle=r.color||"#c23a3a"; ctx.font="10px sans-serif"; ctx.textAlign="right";
      ctx.fillText(r.label,chartArea.right-4,y-4); } ctx.restore(); });
}};
const gaugeTextPlugin={id:"echGauge",afterDraw(ch){
  const g=ch.options._gauge; if(!g) return;
  const {ctx}=ch; const meta=ch.getDatasetMeta(0); if(!meta.data[0]) return;
  const cx=meta.data[0].x, cy=meta.data[0].y;
  ctx.save(); ctx.textAlign="center";
  ctx.fillStyle=g.ink; ctx.font="700 24px sans-serif"; ctx.fillText(F(g.value),cx,cy-2);
  ctx.fillStyle=g.muted; ctx.font="11px sans-serif"; ctx.fillText(g.label||"",cx,cy+18);
  ctx.restore();
}};
if(window.Chart){ Chart.register(refLinePlugin,gaugeTextPlugin); }
function seriesColor(s){ return (s.lineStyle&&s.lineStyle.color)||(s.itemStyle&&typeof s.itemStyle.color==="string"&&s.itemStyle.color)||undefined; }
function ptVal(d){ return (d&&typeof d==="object"&&!Array.isArray(d))?d.value:d; }
function translate(o){
  const ink=cssv("--ink","#222"), muted=cssv("--muted","#777"), grid="rgba(128,128,140,.18)";
  const s0=o.series&&o.series[0];
  if(!s0) return null;
  /* ---- gauge ---- */
  if(s0.type==="gauge"){
    const val=ptVal(s0.data[0]), max=s0.max||100;
    const col=(s0.progress&&s0.progress.itemStyle&&s0.progress.itemStyle.color)||cssv("--brand","#6030F0");
    return {type:"doughnut",
      data:{datasets:[{data:[val,Math.max(0,max-val)],backgroundColor:[col,grid],borderWidth:0,cutout:"76%",circumference:240,rotation:-120}]},
      options:{responsive:true,maintainAspectRatio:false,
        _gauge:{value:val,label:(s0.data[0]&&s0.data[0].name)||"",ink:ink,muted:muted},
        plugins:{legend:{display:false},tooltip:{enabled:false}}}};
  }
  /* ---- pie ---- */
  if(s0.type==="pie"){
    return {type:"doughnut",
      data:{labels:s0.data.map(d=>d.name),
        datasets:[{data:s0.data.map(d=>d.value),
          backgroundColor:s0.data.map(d=>(d.itemStyle&&d.itemStyle.color)||undefined),
          borderWidth:1,borderColor:cssv("--surface","#fff")}]},
      options:{responsive:true,maintainAspectRatio:false,cutout:"55%",
        plugins:{legend:{display:true,position:"right",labels:{color:muted,font:{size:10},boxWidth:10}},
          tooltip:{callbacks:{label:c=>c.label+": "+F(c.raw)}}}}};
  }
  /* ---- axis charts (line / bar / waterfall) ---- */
  const horiz=o.yAxis&&o.yAxis.type==="category";
  const catAxis=horiz?o.yAxis:o.xAxis;
  const cats=(catAxis&&catAxis.data)||[];
  let stacked=false, refs=[], waterfall=o.series.some(s=>s.stack==="w");
  const datasets=o.series.map(function(s,si){
    if(s.markLine&&s.markLine.data&&s.markLine.data[0]&&s.markLine.data[0].yAxis!==undefined)
      refs.push({v:s.markLine.data[0].yAxis,label:(s.markLine.label&&s.markLine.label.formatter)||"",color:(s.markLine.lineStyle&&s.markLine.lineStyle.color)});
    if(s.stack)stacked=true;
    const base=seriesColor(s);
    const data=s.data.map(ptVal);
    /* per-point colors (waterfall / cellColor) */
    let bg=base;
    if(s.itemStyle&&typeof s.itemStyle.color==="function"){
      bg=s.data.map((d,i)=>{try{return s.itemStyle.color({value:ptVal(d),dataIndex:i});}catch(e){return base;}});
    } else if(s.data.some(d=>d&&typeof d==="object"&&d.itemStyle)){
      bg=s.data.map(d=>(d&&d.itemStyle&&d.itemStyle.color)||base||"transparent");
    }
    if(s.type==="line"){
      return {type:"line",label:s.name,data:data,borderColor:base,pointBackgroundColor:base,
        backgroundColor:s.areaStyle?rgba(base,.15):base,fill:!!s.areaStyle,
        tension:s.smooth?.35:0,pointRadius:2,borderWidth:2,spanGaps:true,
        _real:s.data.map(d=>(d&&typeof d==="object"&&d.real!==undefined)?d.real:undefined)};
    }
    return {type:"bar",label:s.name,data:data,backgroundColor:bg,
      stack:s.stack? "s":undefined,maxBarThickness:26,borderRadius:3,borderSkipped:false,
      _wfbase:waterfall&&si===0,
      _real:s.data.map(d=>(d&&typeof d==="object"&&d.real!==undefined)?d.real:undefined)};
  });
  const valScale={grid:{color:grid},ticks:{color:muted,font:{size:10},callback:function(v){return F(this.getLabelForValue?v:v);}},
    stacked:stacked,beginAtZero:false};
  if(o.yAxis&&o.yAxis.min!==undefined&&!horiz) valScale.min=o.yAxis.min;
  const catScale={grid:{display:false},ticks:{color:muted,font:{size:10},autoSkip:true,maxRotation:40},stacked:stacked};
  const showLegend=datasets.filter(d=>!d._wfbase).length>1&&(!o.legend||o.legend.show!==false);
  return {type:"bar",
    data:{labels:cats,datasets:datasets},
    options:{responsive:true,maintainAspectRatio:false,indexAxis:horiz?"y":"x",
      interaction:{mode:"index",intersect:false},
      _refs:refs,
      plugins:{legend:{display:showLegend,position:"top",labels:{color:muted,font:{size:10.5},boxWidth:12,filter:function(item,data){var ds=data.datasets[item.datasetIndex];return !ds._wfbase;}}},
        tooltip:{callbacks:{label:function(c){ var ds=c.dataset;
            if(ds._wfbase) return null;
            var v=(ds._real&&ds._real[c.dataIndex]!==undefined)?ds._real[c.dataIndex]:c.raw;
            return (ds.label?ds.label+": ":"")+F(v); }}}},
      scales:horiz?{x:valScale,y:catScale}:{x:catScale,y:valScale}}};
}
window.echarts={
  init:function(el){
    el.innerHTML="";
    const cv=document.createElement("canvas");
    cv.style.width="100%"; cv.style.height="100%";
    el.appendChild(cv);
    let chart=null;
    return {
      setOption:function(opt){
        try{
          const cfg=translate(opt); if(!cfg) return;
          if(cfg.data.datasets){ cfg.data.datasets.forEach(function(ds){ if(ds._wfbase){ ds.backgroundColor="rgba(0,0,0,0)"; } }); }
          chart=new Chart(cv,cfg);
        }catch(e){ el.innerHTML='<div style="font-size:11px;color:var(--muted);padding:14px">Chart unavailable: '+e.message+"</div>"; }
      },
      resize:function(){ if(chart)chart.resize(); },
      dispose:function(){ if(chart){chart.destroy();chart=null;} el.innerHTML=""; }
    };
  }
};
})();
