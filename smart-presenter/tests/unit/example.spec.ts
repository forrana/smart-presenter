import { shallowMount } from "@vue/test-utils";
import LangCard from "@/components/LangCard.vue";

describe("LangCard.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(LangCard, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
