<template>
<div>
  <pre class="line-numbers">
    <code class="language-java">
    //双指针
    public boolean hasCycle(ListNode head) {
        if(head == null || head.next == null)   return false;
        ListNode fast = head.next;
        ListNode slow = head;
        while(fast != slow){
            if(fast == null || fast.next == null)
                return false;
            fast = fast.next.next;
            slow = slow.next;
        }
        return true;
    }
    </code>
  </pre>
</div>
</template>

<script>
// import Prism from 'prismjs';
// import prismCss from '@/assets/css/prism.css';
//
// export default {
//   name: 'Test',
//   mounted() {
//     Prism.highlightAll()
//   }
// }
</script>

<style>


</style>
